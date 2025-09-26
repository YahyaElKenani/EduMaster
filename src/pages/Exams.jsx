import Header from '../components/Header'
import Footer from '../components/Footer'
import { CgFileDocument } from "react-icons/cg";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/context';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';
export default function Exams() { 
    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const [userClassLevel, setUserClassLevel] = useState();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const getExams = async () => { 
        const res = await fetch('https://edu-master-psi.vercel.app/exam', {
            headers: {
                token: token
            }
        });
        const result = await res.json();
        setExams(result?.data);
    }

    const getUserClassLevel = async () => { 
        const res = await fetch('https://edu-master-psi.vercel.app/user/', { 
            method: 'GET',
            headers: {
                token: token
            }
        })
        const result = await res.json();
        setUserClassLevel(result?.data?.classLevel);
    }

    useEffect(() => {getExams(); getUserClassLevel();}, []);
    useEffect(() => {
        if (exams && userClassLevel) { 
            const targetedExams = exams?.filter((exam) => exam?.classLevel === userClassLevel);
            setFilteredExams(targetedExams);
        }
    }, [exams, userClassLevel])

    return ( 
        <> 
            <Header />
            <main className='flex flex-col items-center'> 
                <div className="bg-[var(--primary-bg)] p-12 flex flex-col items-center md:flex-row md:justify-between w-full gap-4"> 
                    <div className="w-full flex items-center justify-between"> 
                        <div className="flex items-center gap-3"> 
                            <CgFileDocument size={24} />
                            <h1 className="text-2xl font-bold">Your Exams</h1>
                        </div>
                    </div>
                </div>

                <div className='overflow-x-auto rounded-xl shadow-md w-[50dvw] my-10'>
                    <table className='min-w-full text-left text-sm md:text-base'>
                        <thead className='bg-[var(--border-color)] hidden md:table-header-group'>
                            <tr>
                                <th className='p-3'>Title</th>
                                <th className='p-3'>Duration</th>
                                <th className='p-3'>Questions</th>
                                <th className='p-3'>Start</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-[var(--border-color)]'>
                            {
                                filteredExams && 
                                filteredExams.map((exam) => (
                                    <tr 
                                    key={exam?._id}
                                    className='block md:table-row'> 
                                        <td className='md:table-cell p-3 w-full md:w-1/4 text-lg flex gap-1 flex-col'>
                                            <span className="font-semibold md:hidden">Title: </span>
                                            <div className="text-sm md:text-lg">
                                                            {exam?.title}
                                            </div>
                                        </td>
                                        <td className='md:table-cell p-3 w-full md:w-1/4 text-lg flex gap-1 flex-col'>
                                            <span className="font-semibold md:hidden">Duration: </span>
                                            <div className="text-sm md:text-lg">
                                                {exam?.duration}
                                            </div>
                                        </td>
                                        <td className='md:table-cell p-3 w-full md:w-1/4 text-lg flex gap-1 flex-col'>
                                            <span className="font-semibold md:hidden">Title: </span>
                                            <div className="text-sm md:text-lg">
                                                {exam?.questions?.length}
                                            </div>
                                        </td>
                                        <td className='w-1/4 p-3'>
                                            <PrimaryButton label={'Start Exam'} fn={() => navigate('/start-exam', {state: {exam: exam}})}/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    )
}