export default function({route, store, redirect }) {
  let id = route.params.id;
  let ergo = store.state.ergos.data.find(i => i.id == id);
  if (!ergo.public) {
    return redirect("/search")
  }
}

