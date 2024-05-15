import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from './../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProfileComp() {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [fileUploadProgress, setFileUploadProgress] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(null);
    const filePickerRef = useRef();

    // console.log(fileUploadProgress, fileUploadError);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    const uploadImage = useCallback(async () => {
        if (!imageFile) return;

        setFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFileUploadProgress(progress.toFixed(0));
            },
            // eslint-disable-next-line no-unused-vars
            (error) => {
                setFileUploadError('Failed to upload profile image');
                setFileUploadProgress(0);
                setImageFile(null);
                setImageFileUrl(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                });
            }
        );
    }, [imageFile]);

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile, uploadImage]);

    return (
        <div className="max-w-lg p-3 w-full mx-auto">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                    {fileUploadProgress > 0 && fileUploadProgress < 100 && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <CircularProgressbar
                                value={fileUploadProgress}
                                text={`${Math.round(fileUploadProgress)}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%',
                                        height: '100%',
                                    },
                                    path: {
                                        stroke: `rgba(62, 152, 199, ${fileUploadProgress / 100})`,
                                    },
                                    text: {
                                        fill: 'green',
                                        fontSize: '16px',
                                    },
                                }}
                            />
                        </div>
                    )}

                    <img src={imageFileUrl || currentUser.profilePicture} alt='User' className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${fileUploadProgress && fileUploadProgress < 100 && 'opacity-60'}`} />
                </div>

                {fileUploadError && <Alert color={'failure'}>{fileUploadError}</Alert>}

                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />

                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />

                <TextInput type='password' id='password' placeholder='password' />

                <Button type='submit' gradientDuoTone="purpleToBlue" outline>Update</Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}
