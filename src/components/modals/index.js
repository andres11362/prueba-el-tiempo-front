import NewsForm from "../form/news";
import SectionForm from "../form/sections";
import UserForm from "../form/users";

/**
 * Modal de formularios de la aplicación
 * Dependiendo del parametro type msotrara 
 * un tipo diferente de formulario, entre usuarios,
 * secciones y noticias.
 * @param {*} param0 
 * @returns 
 */
const Modal = ({ 
    open, 
    setOpen, 
    type, 
    title, 
    data, 
    action, 
    changePage, 
    setNotificationModal,
    setCloseNotificationModal
}) => {

    /**
     * Decide que tipo de formulario mostrar
     * segun el prop type
     * @returns Componente
     */
    const getFormType = () => {
        switch (type) {
            case 'users':
                return <UserForm 
                            setOpen={setOpen} 
                            changePage={changePage} 
                            setNotificationModal={setNotificationModal}
                            setCloseNotificationModal={setCloseNotificationModal}
                        />
            case 'sections':
                return <SectionForm 
                            row={data} 
                            setOpen={setOpen} 
                            action={action} 
                            changePage={changePage} 
                            setNotificationModal={setNotificationModal}
                            setCloseNotificationModal={setCloseNotificationModal}
                        />
            case 'news':
                return <NewsForm 
                            row={data} 
                            setOpen={setOpen} 
                            setToast 
                            action={action} 
                            changePage={changePage}  
                            setNotificationModal={setNotificationModal}
                            setCloseNotificationModal={setCloseNotificationModal}
                        />
            default:
                break;
        }
    }

    return (
        <>
            {open && (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-6xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        { title }
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setOpen()}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                   { getFormType() }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => setOpen()} className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    )
}

export default Modal;