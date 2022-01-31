/**
 * Banner de la aplicación
 * @returns 
 */
const Banner = () => {
    return (
        <div className="bg-cover bg-center  h-auto text-white py-24 px-10 object-fill" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)' }}>
            <div className="md:w-1/2">
                <p className="font-bold text-sm uppercase">Bienvenido</p>
                <p className="text-3xl font-bold">Portal de noticias</p>
                <p className="text-2xl mb-10 leading-none">Todas las noticias de interes</p>
            </div>
        </div>
    );
}

export default Banner;