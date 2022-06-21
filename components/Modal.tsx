const Modal = ({children, buttons}: {children: any, buttons: any}) => {
    return (
        <div className='z-10 fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity'>
            <div className="fixed inset-0 overflow-y-auto">
                <div
                    className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <div
                        className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                {children}
                            </div>
                        </div>
                        <div className="bg-zinc-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            {buttons.map((Button: any, i: number) => {
                                return <Button key={i}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal