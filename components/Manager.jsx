import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify'; // Import Zoom from react-toastify
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [visibility, setVisibility] = useState({}); // Track visibility of passwords

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const ref = useRef();
    const passwordRef = useRef();

    const showPassword = () => {
        if (ref.current && ref.current.src.includes("eyecross.png")) {
            ref.current.src = "eye.png";
            passwordRef.current.type = "password";
        } else if (ref.current) {
            ref.current.src = "eyecross.png";
            passwordRef.current.type = "text";
        }
    };

    const toggleVisibility = (id) => {
        setVisibility(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const savePassword = () => {
        if(form.site.length >3 && form.username.length > 3 && form.password.length >3){
            toast.success('Succesfully Saved!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            const newPassword = { ...form, id: uuidv4() };
            setPasswordArray([...passwordArray, newPassword]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, newPassword]));
            setVisibility(prev => ({ ...prev, [newPassword.id]: false }));

        }
        else{
            toast.error('Password Not Saved!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Zoom,
                })

        }
        
    };

    const deletePassword = (id) => {
        let c = confirm("Are you sure you want to delete?");
        if (c) {
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        }
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(i => i.id === id);
        setform(passwordToEdit);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Zoom} 
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
            </div>
            <div className=" p-2 md:p-0  md:mycontainer min-h-[85.8vh] " >
                <h1 className='text text-4xl font-bold text-center py-2'>
                    <span className='text-green-700'> &lt;</span>
                    <span>Safe</span><span className='text-green-700'>Pass/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>
                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" placeholder='Enter Website URL' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" placeholder='Enter Username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" placeholder='Enter Password' />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword} >
                                <img ref={ref} className='p-1' width={26} src="/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center rounded-full bg-green-500 w-fit px-8 py-2 gap-1'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-2'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords To Show</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full mb-5">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item) => (
                                    <tr key={item.id}>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <span>{item.username}</span>
                                                <div className='cursor-pointer' onClick={() => copyText(item.username)}>
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='text-center py-2 border border-white'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <span>{visibility[item.id] ? item.password : '••••••••'}</span>
                                                <div className='cursor-pointer' onClick={() => toggleVisibility(item.id)}>
                                                    <img className='p-1' width={26} src={visibility[item.id] ? "/eyecross.png" : "/eye.png"} alt="eye" />
                                                </div>
                                                <div className='cursor-pointer' onClick={() => copyText(item.password)}>
                                                    <lord-icon
                                                        style={{ width: "25px", height: "25px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center py-2 border border-white'>
                                            <span onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
};

export default Manager;



