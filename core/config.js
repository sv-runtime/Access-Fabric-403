export async function loadConfig(options = {}) {
  const {
    basePath = "./data",
    cache = "no-store"
  } = options;

  const files = [
    "traffic.txt",
    "identity.txt",
    "themes.txt",
    "policy.txt",
    "ui.txt",
    "visuals.txt"
  ];

  const requests = files.map((name) =>
    fetch(`${basePath}/${name}`, { cache }).then(async (r) => {
      if (!r.ok) {
        throw new Error(`Config load failed: ${name} (${r.status})`);
      }

      return r.json();
    })
  );

  const [
    TRAFFIC,
    IDENTITY,
    THEMES,
    POLICY,
    UI,
    VISUALS
  ] = await Promise.all(requests);

  const CONFIG = {
    ...TRAFFIC,
    ...IDENTITY,
    ...THEMES,
    ...POLICY,
    ...UI,
    ...VISUALS
  };

  validateConfig(CONFIG);

  return CONFIG;
}

export function validateConfig(CONFIG) {
  if (!CONFIG || typeof CONFIG !== "object") {
    throw new Error("Config invalid: not an object");
  }

  if (!CONFIG.GROUP_WEIGHTS) {
    throw new Error("Config missing GROUP_WEIGHTS");
  }

  if (typeof CONFIG.GROUP_WEIGHTS !== "object") {
    throw new Error("Config invalid: GROUP_WEIGHTS must be an object");
  }

  if (!CONFIG.GROUP_LABELS) {
    throw new Error("Config missing GROUP_LABELS");
  }

  if (!CONFIG.UI_TEXT) {
    throw new Error("Config missing UI_TEXT");
  }

  if (!CONFIG.FLAG_THEMES) {
    throw new Error("Config missing FLAG_THEMES");
  }
}
