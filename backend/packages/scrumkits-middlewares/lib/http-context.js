const cls = require("cls-hooked");

const nameSpaceKey = "scrumkits_cls_hook";

function middleware(req, res, next) {
  const ns =
    cls.getNamespace(nameSpaceKey) || cls.createNamespace(nameSpaceKey);
  ns.run(() => next());
}

function get(key) {
  const ns = cls.getNamespace(nameSpaceKey);
  if (ns && ns.active) {
    return ns.get(key);
  }
}

function set(key, value) {
  const ns = cls.getNamespace(nameSpaceKey);
  if (ns && ns.active) {
    return ns.set(key, value);
  }
}

module.exports = {
  middleware,
  get,
  set,
};
