import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import LOGO from '../../assets/Logo.png';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Profile({ setUserLoginState }) {

    const navigate = useNavigate();
    const [preview, setPreview] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const [userData, setUserData] = useState({
        fname: "",
        lname: "",
        username: '',
        number: '',
        email: '',
        usertype: '',
        gender: '',
        dob: '',
        address: '',
        favitem: '',
        freshpoints: '',
        profilePic: '',
    });

    useEffect(() => {

        async function userDetail() {
            try {
                const response = await axios.get("http://localhost:3000/user/currentUser", { withCredentials: true });
                let user = response.data;
                if (user) {
                    setUserData({
                        fname: user.fname,
                        lname: user.lname,
                        username: user.username,
                        number: user.number,
                        email: user.email,
                        usertype: user.usertype,
                        gender: user.gender,
                        dob: user.dob,
                        address: user.address,
                        favitem: user.favitem,
                        freshpoints: user.freshpoints,
                        profilePic: user.profilePic
                    });

                    const previewUrl = `http://localhost:3000/uploads/${user.profilePic}`;
                    setPreview(previewUrl);
                }
            } catch (err) {
                toast.error("Unable To Fetch Details");
            }
        };

        userDetail();
    }, []);

    async function handleLogout() {
        try {
            await axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true });
            setUserLoginState(false);
            navigate('/');
            toast.success("You have logged out successfully");
        }
        catch (err) {
            toast.error("Error Occurred");
        }
    };

    async function handleProfilePicUpload(e) {
        e.preventDefault();
        if (!selectedFile) {
            toast.error("Please select a file");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            const response = await axios.post('http://localhost:3000/user/profilePic', formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 200) {
                toast.success("Profile pic updated!");
                setPreview(URL.createObjectURL(selectedFile));
            }
        } catch (err) {
            toast.error("Failed to upload profile pic");
        }
    }

    return (
        <div>
            <div className=" bg-black flex justify-center">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link to={'/'}>
                        <img src={LOGO} alt="" className='my-10' />
                    </Link>
                </motion.button>
            </div>
            <div className="bghc p-3 md:p-5 m-4 md:m-10 rounded-lg flex items-center flex-col">
                <div className="w-full md:w-4/5">
                    <Link to={'/'}>
                        <button className="">
                            <svg width="64px" height="64px" viewBox="-4.8 -4.8 57.60 57.60" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#1a1a1a"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fillOpacity="0.01"></rect> <path d="M41.9999 24H5.99992" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M30 12L42 24L30 36" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </button>
                    </Link>
                    <form onSubmit={handleProfilePicUpload}>
                        <div className="form-group">
                            <input type="file" className="form-control-file" name="image" onChange={(e) => setSelectedFile(e.target.files[0])} />
                            <button type="submit">Change ProfilePic</button>
                        </div>
                    </form>
                    <div className="flex justify-center p-3 w-full">
                        <img src={preview} alt="" className="rounded-full bg-contain h-32 w-32 md:h-60 md:w-60" />
                    </div>


                    <div className="flex justify-evenly align-middle p-3 w-full">
                        <div className=" fredoka text-lg w-1/2 mr-2">
                            <label htmlFor="">First Name</label><br />
                            <input type="text" disabled={true} placeholder={userData.fname} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full"></input>
                        </div>
                        <div className="fredoka text-lg w-1/2 ml-2">
                            <label htmlFor="">Last Name</label><br />
                            <input type="text" disabled={true} placeholder={userData.lname} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full"></input>

                        </div>
                    </div>
                    <div className="fredoka text-lg flex justify-center align-middle p-3">
                        <div className="w-full">
                            <label htmlFor="">Email</label><br />
                            <input type="text" disabled={true} placeholder={userData.email} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full"></input>
                        </div>

                    </div>
                    <div className="fredoka text-lg flex justify-center align-middle p-3">
                        <div className="w-full">
                            <label htmlFor="">Number</label><br />
                            <input type="text" disabled={true} placeholder={userData.number} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full"></input>
                        </div>

                    </div>
                    <div className="fredoka text-lg flex justify-center align-middle p-3">
                        <div className="w-full">
                            <label htmlFor="">UserType</label><br />
                            <input type="text" disabled={true} placeholder={userData.usertype} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full"></input>
                        </div>
                    </div>
                    <div className="flex justify-evenly align-middle p-3 w-full">
                        <div className=" fredoka text-lg w-1/2 mr-1">
                            <label htmlFor="">Gender</label><br />
                            <select name="gender" disabled={true} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full h-10">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="fredoka text-lg w-1/2" >
                            <label htmlFor="">Date Of Birth</label><br />
                            <input type="date" disabled={true} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full"></input>
                        </div>
                    </div>
                    <div className="fredoka text-lg flex justify-center align-middle p-3">
                        <div className="w-full">
                            <label htmlFor="">Address</label><br />
                            <textarea rows={4} type="" disabled={true} placeholder={userData.address} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full"></textarea>
                        </div>

                    </div>
                    <div className="fredoka text-lg flex justify-center align-middle p-3">
                        <div className="w-full">
                            <label htmlFor="">Favourite Item</label><br />
                            <input type="text" disabled={true} placeholder={userData.favitem} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full"></input>
                        </div>

                    </div>
                    <div className="fredoka text-lg flex justify-center align-middle p-3">
                        <div className="w-full">
                            <label htmlFor="">Fresh Points</label><br />
                            <input type="text" disabled={true} placeholder={userData.freshpoints} className=" bg-[#142328] text-[#06c167] rounded-sm border-[#1e5037] border p-1 w-full"></input>
                        </div>
                    </div>
                    <div className="flex justify-evenly my-5">
                        <button className="fredoka text-3xl text-[#06c167] hover:underline" onClick={handleLogout}>Logout</button>
                        <button className="fredoka text-3xl text-[#06c167] hover:underline">Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
