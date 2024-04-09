const getUsuarioByID= (id, callback) => {
    const usuario = {
        id,
        nombre: 'fercho'
    }

    setTimeout(()=> {
        callback(usuario);
    }, 1500)
}


getUsuarioByID(1, ({id, nombre})=>{
    console.log(id);
    console.log(nombre.toUpperCase());
})