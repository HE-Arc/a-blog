export default {
  req: v => !!v || "Requis",
  min: n => v => (!v || v.length >= n) || `Minimum ${n} caractères`,
  max: n => v => (!v || v.length <= n) || `Maximum ${n} caractères`,
  len: n => v => (!v || v.length === n) || `${n} caractères`,
  email: v => /\S+@\S+\.\S+/.test(v) || "L'adresse email n'est pas valide",
  num: v => (!v || parseInt(v) == v) || "ex: 0321234567",
};
