    import { useContext, useEffect, useRef, useState } from "react";
    import { useLocation, useNavigate } from "react-router-dom";
    import { IoMdTime } from "react-icons/io";
    import PrimaryButton from "../components/PrimaryButton";
    import { AuthContext } from "../context/context";

    const inputStyles = `mt-1 mb-4 w-full p-3 rounded-xl bg-gray-100`;

    export default function StartExam() {
    const [remainingTime, setRemainingTime] = useState(null);
    const [examStarted, setExamStarted] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const intervalRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const exam = location.state?.exam ?? null;
    useEffect(() => {
        if (exam) {
        const initial = exam.questions.map((q) => ({
            questionId: q._id,
            selectedAnswer: "empty",
        }));
        setAnswers(initial);
        setRemainingTime(exam.duration);
        }
    }, [exam]);

    useEffect(() => {
        if (!examStarted || remainingTime === null) return;

        intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
            if (prev <= 1 || isSubmitting) {
            clearInterval(intervalRef.current);
            return 0;
            }
            return prev - 1;
        });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [examStarted]);

    useEffect(() => {
        if (remainingTime === 0 && examStarted && !hasSubmitted) {
        submitExam();
        }
    }, [remainingTime, examStarted, hasSubmitted]);

    const startExam = async () => {
        try {
        const res = await fetch(
            `https://edu-master-psi.vercel.app/studentExam/start/${exam._id}`,
            {
            method: "POST",
            headers: { token },
            }
        );
        const result = await res.json();
        if (result.success) setExamStarted(true);
        } catch (err) {
        console.error(err);
        }
    };

    const selectAnswer = (value, id) => {
        setAnswers((prev) =>
        prev.map((a) =>
            a.questionId === id ? { ...a, selectedAnswer: value } : a
        )
        );
    };

    const submitExam = async () => {
        if (isSubmitting || hasSubmitted) return;
        setIsSubmitting(true);
        try {
        const res = await fetch(
            `https://edu-master-psi.vercel.app/studentExam/submit/${exam._id}`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token,
            },
            body: JSON.stringify({ answers }),
            }
        );
        const result = await res.json();
        if (result.success) { 
            setHasSubmitted(true);
            navigate("/show-score", { state: { examId: exam._id } });
        } else { 
            window.alert(result.message);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
        } catch (err) {
        console.error(err);
        } finally {
        setIsSubmitting(false);
        }
    };

    const getSelected = (id) =>
        answers.find((a) => a.questionId === id)?.selectedAnswer ?? "";

    return (
        <main className="flex flex-col">
        <div className="bg-[var(--primary-bg)] p-12 flex flex-col md:flex-row md:justify-between w-full gap-4">
            <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl font-bold">Exam: {exam?.title}</h1>
            <div className="flex items-center gap-3">
                <IoMdTime size={24} />
                <span>{remainingTime ?? "-"} s</span>
                {!examStarted && (
                <PrimaryButton label="Start Exam" fn={startExam} />
                )}
            </div>
            </div>
        </div>

        <div className="flex flex-col items-center w-full mt-10">
            {exam && examStarted && (
            <div className="flex flex-col p-5 rounded-2xl border-2 border-[var(--border-color)] w-[50dvw]">
                <div className="text-2xl font-bold mb-5">Questions</div>
                {exam.questions.map((q, i) => (
                <div
                    key={q._id}
                    className="border-b-2 border-b-[var(--border-color)] mb-5 flex flex-col"
                >
                    <div className="flex justify-between w-full items-center">
                    <div className="text-lg mb-2 font-semibold">
                        Question No.{i + 1}
                    </div>
                    </div>
                    <div className="flex flex-col gap-1 text-lg">
                    <label>{q.text}</label>
                    </div>

                    <div className="flex flex-col gap-3 text-lg mb-3">
                    {q.type === "true-false" || q.type === "multiple-choice" ? (
                        q.options.map((opt, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <input
                            type="radio"
                            name={`q-${q._id}`}
                            value={opt}
                            checked={getSelected(q._id) === opt}
                            onChange={(e) =>
                            selectAnswer(e.target.value, q._id)
                            }
                            />
                            <label>{opt}</label>
                        </div>
                        ))
                    ) : (
                        <div>
                        <label>Answer</label>
                        <input
                            className={inputStyles}
                            onChange={(e) => selectAnswer(e.target.value, q._id)}
                            placeholder="Enter your answer"
                        />
                        </div>
                    )}
                    </div>

                    <div className="flex flex-col gap-1 text-lg">
                    <label>Points</label>
                    <input
                        className={inputStyles}
                        type="number"
                        value={q.points}
                        disabled
                    />
                    </div>
                </div>
                ))}
                <PrimaryButton
                label={isSubmitting ? "Submitting..." : "Submit Exam"}
                className="self-center"
                fn={submitExam}
                />
            </div>
            )}
        </div>
        </main>
    );
    }
