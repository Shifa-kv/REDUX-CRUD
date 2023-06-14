import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleting, adding, editing } from '../Redux/UserReducer';


const Registration = () => {
    const [EditPopup, showEditPopup] = useState(false);
    const [AddPopup, showAddPopup] = useState(false);
    type user = {
        id: number | undefined,
        uname: string,
        phone: number,
        status: boolean
    }
    const [EditUser, setEditUser] = useState<user>();
    const value = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
// add user details
    const addUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let target = e.currentTarget;
        const formValues: user = {
            id: undefined,
            uname: target.uname.value,
            phone: target.phone.value,
            status: target.status.value == 'active' ? true : false
        }
        // an action to do changes in state, ie dispatch
        dispatch(adding(formValues))
        showAddPopup(false)
    }
// delete user details
    const deleteUser = (e: React.MouseEvent<HTMLButtonElement>, key: number) => {
        e.preventDefault();
        // an action to do changes in state, ie dispatch
        dispatch(deleting(key))
    }
// show user details to edit
    const editUsershow = (e: React.MouseEvent<HTMLButtonElement>, key: number) => {
        e.preventDefault();
        showEditPopup(true);
        const user = value.find((res: any) => res.id === key);
        user && setEditUser(user);

    }
// edit user details
    const editUser = (e: React.FormEvent<HTMLFormElement>, key: any) => {
        e.preventDefault();
        let target = e.currentTarget;
        const formValues: user = {
            id: key,
            uname: target.uname.value,
            phone: target.phone.value,
            status: target.status.value == 'active' ? true : false
        }
        dispatch(editing(formValues))
        showEditPopup(false);
    }


    return (
        <header className="App-header container mx-auto px-10 py-10">
            <div className=' flex flex-wrap	flex-row  '>
                <div className='basis-1/4 p-4 text-center'>
                    <div className='border border-sky-500 h-full p-10 rounded-lg shadow-lg'>
                        <button className='font-thin border border-dashed rounded-full w-[80px] h-[80px]' onClick={() => { showAddPopup(true) }}>
                            <span className='leading-8  text-6xl'>+</span>
                        </button>
                        <h2 className="font-bold ">Add user</h2>
                    </div>
                </div>
                {value && value.map((user: any) => {
                    return <div className=' basis-1/4 p-4 '>
                        <div className='border border-sky-500 p-5 h-full rounded-lg shadow-lg flex flex-col'>
                            <span className='text-slate-500	'>{user.id}</span>
                            <h2 className='uppercase text-2xl'>{user.uname}</h2>
                            <p className='text-slate-400'>{user.phone}</p>
                            <div className='flex flex-auto items-end justify-end gap-1'>
                            <button onClick={(e) => { deleteUser(e, user.id) }}>
                                <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                                </svg>
                            </button><br />
                            <button  onClick={(e) => { editUsershow(e, user.id) }}>
                                <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                </svg>
                            </button>
                            </div>
                        </div>
                    </div>
                })}
                {AddPopup &&
                    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/70	'>
                        <form onSubmit={addUser} className='w-6/12 text-left bg-white text-black relative p-10 rounded-lg'>
                            <h2 className="text-3xl font-bold  mb-8 text-center">Add user</h2>
                            <button onClick={() => showAddPopup(false)} className='closePopup rounded-full absolute top-3 right-5 bg-black text-slate-100 px-2 text-sm'>X</button>
                            <input type='text' placeholder='name' name='uname' className='form-input px-4 py-2 w-full rounded-lg mb-3'></input><br />
                            <input type='text' placeholder='phone' name='phone' className='form-input px-4 py-2 w-full rounded-lg mb-3'></input><br />
                            <label>Status : </label><br />
                            <input type='radio' name='status' value='active' className='mx-3' />Active
                            <input type='radio' name='status' value='inactive' className='mx-3' />Inactive<br />
                            <button type='submit' className='bg-sky-500 text-slate-50 font-bold p-2 w-full rounded-lg mt-8'>submit</button>
                        </form>
                    </div>
                }
                {EditPopup &&
                    <div  className='fixed inset-0 flex items-center justify-center z-50 bg-black/70	'>
                        <form onSubmit={(e) => { editUser(e, EditUser?.id) }} className='w-6/12 text-left bg-white text-black relative p-10 rounded-lg'>
                            <h2 className="text-3xl font-bold  mb-8 text-center">Edit contact</h2>
                            <button onClick={() => showEditPopup(false)} className='closePopup rounded-full absolute top-3 right-5 bg-black text-slate-100 px-2 text-sm'>X</button>
                            <input type='text' placeholder='name' name='uname' defaultValue={EditUser?.uname} className='form-input px-4 py-2 w-full rounded-lg mb-3'></input><br />
                            <input type='text' placeholder='phone' name='phone' defaultValue={EditUser?.phone} className='form-input px-4 py-2 w-full rounded-lg mb-3'></input><br />
                            <label>Status : </label><br />
                            <input type='radio' name='status' value='active' defaultChecked={EditUser?.status == true && true} className='mx-3'  />Active
                            <input type='radio' name='status' value='inactive' defaultChecked={EditUser?.status == false && true} className='mx-3'  />Inactive<br />
                            <button type='submit' className='bg-sky-500 text-slate-50 font-bold p-2 w-full rounded-lg mt-8'>submit</button>
                        </form>
                    </div>
                }
            </div>
        </header>
    )
}
export default Registration