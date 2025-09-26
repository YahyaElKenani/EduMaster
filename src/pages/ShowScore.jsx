import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { AuthContext } from "../context/context";
import Header from "../components/Header";
import { FaCheckCircle } from "react-icons/fa";
export default function ShowScore() { 
    const [score, setScore] = useState();
    const location = useLocation();
    const { examId } = location.state || null;
    const { token } = useContext(AuthContext);
    const getScore = async () => { 
        const res = await fetch(`https://edu-master-psi.vercel.app/studentExam/exams/score/${examId}`, { 
            method: 'GET', 
            headers: { 
                token: token
            }
        })
        const result = await res.json();
        setScore(result?.data ?? 'Not Found');
    }

    useEffect(() => {getScore()}, [])
    return ( 
        <> 
            <Header />
            <main className="flex flex-col min-h-[90dvh] items-center justify-center"> 
                <FaCheckCircle size={36} />
                <div>Your Score: {score}</div>
            </main>
        </>
    )
}