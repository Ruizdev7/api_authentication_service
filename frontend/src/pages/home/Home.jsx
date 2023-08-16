//import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


import React, { useEffect, useState } from "react";
import { User, CA, CO } from "./../../assets/SVG";
import { Dialog, Transition } from "@headlessui/react";
import {
	SpanishText,
	EnglishText,
} from "../../components/InformedConsentLaw1581";

const Home = () => {
	const nombre_usuario_actual = useSelector((state) => state);
	const current_user =
		nombre_usuario_actual.authAPISlice.current_user.ccn_employee || 0;
	const [role, setRole] = useState(0);
	const [language, setLanguage] = useState("Español");
	const [informedConsentLaw1581, setInformedConsentLaw1581] = useState(0);

	//if (!employeePerformanceEvaluation) return <></>;
	//useEffect(() => {
	//	getEvents();
	//}, []);

	//	const handleSubmit = () => {
	//		const body = {
	//			ccn_employee: current_user,
	//			informed_consent_law_1581: informedConsentLaw1581 === "on" ? 1 : 0,
	//		};
	//		updateLaw1581(body);
	//
	//		if (isSuccess) {
	//			toast.success(
	//				informedConsentLaw1581 === "on"
	//					? "Aceptaste con Exito"
	//					: "Rechaste la aceptcion",
	//				{
	//					position: "bottom-right",
	//					autoClose: 5000,
	//					hideProgressBar: false,
	//					closeOnClick: false,
	//					pauseOnHover: true,
	//					draggable: true,
	//					progress: undefined,
	//					theme: "light",
	//				}
	//			);
	//			if (informedConsentLaw1581 === "on") {
	//				window.location = `${import.meta.env.VITE_REDIRECT}/`;
	//			} else {
	//				window.location = `${import.meta.env.VITE_REDIRECT}/home`;
	//			}
	//		} else if (isError) {
	//			toast.error(`Error al Aceptar: ${error.data.msg}`, {
	//				position: "bottom-right",
	//				autoClose: 5000,
	//				hideProgressBar: false,
	//				closeOnClick: true,
	//				pauseOnHover: true,
	//				draggable: true,
	//				progress: undefined,
	//				theme: "light",
	//			});
	//		}
	//	};

	return (
		<>


		</>
	);
};

export default Home;


/*
<InformedConsentLaw1581 English={EnglishText} Spanish={SpanishText} />
 */


/*
{role === 0 ? (
				<div className="block w-auto mx-auto bg-white p-2">
					<h1 className="text-center text-[35px]">
						<strong>Selecciona un rol para comenzar</strong>
					</h1>
					<div className="lg:grid lg:grid-cols-3 sm:grid sm:grid-cols-1 justify-self-center">
						<div className="mx-auto grid justify-items-center">
							<button
								className="rounded-lg w-[165px] h-[185px] bg-[#E19974]"
								onClick={() => setRole(1)}
							>
								<User />
								<p className="text-[20px] text-white">
									<strong>Evaluado</strong>
								</p>
							</button>
							<div className="flex text-center p-1">
								<p className="text-[16px]">
									<strong>Tareas Pendientes</strong>
								</p>
								{employeePerformanceEvaluation &&
									employeePerformanceEvaluation.length === 0 ? (
									<p className="bg-[#007367] text-white w-[24px] h-[24px] mx-1 rounded-full">
										{employeePerformanceEvaluation.length}
									</p>
								) : (
									<p className="bg-[#f05252] text-white w-[24px] h-[24px] mx-1 rounded-full">
										{employeePerformanceEvaluation.length}
									</p>
								)}
							</div>
						</div>
						<div className="m-auto grid justify-items-center">
							<button
								className="mx-auto rounded-lg  w-[165px] h-[185px]  bg-[#B37FB9]"
								onClick={() => setRole(2)}
							>
								<User />
								<p className="text-[20px] text-white">
									<strong>Lider</strong>
								</p>
							</button>
							<div className="flex text-center p-1">
								<p className="text-[16px]">
									<strong>Tareas Pendientes</strong>
								</p>
								{immediateBossPerformanceEvaluation &&
									immediateBossPerformanceEvaluation.length === 0 ? (
									<p className="bg-[#007367] text-white w-[24px] mx-1 h-[24px] rounded-full">
										{immediateBossPerformanceEvaluation.length}
									</p>
								) : (
									<p className="bg-[#f05252] text-white w-[24px] mx-1 h-[24px] rounded-full">
										{immediateBossPerformanceEvaluation.length}
									</p>
								)}
							</div>
						</div>
						<div className="m-auto grid justify-items-center">
							<button
								className="mx-auto rounded-lg w-[165px] h-[185px]  bg-[#8C94A9]"
								onClick={() => setRole(3)}
							>
								<User />
								<p className="text-[20px] text-white">
									<strong>Manager</strong>
								</p>
							</button>
							<div className="flex text-center p-1">
								<p className="text-[16px]">
									<strong>Tareas Pendientes </strong>
								</p>
								{managerPerformanceEvaluation &&
									managerPerformanceEvaluation.length === 0 ? (
									<p className="bg-[#007367] text-white w-[24px] mx-1 h-[24px] rounded-full">
										{managerPerformanceEvaluation.length}
									</p>
								) : (
									<p className="bg-[#f05252] text-white w-[24px] mx-1 h-[24px] rounded-full">
										{managerPerformanceEvaluation.length}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			) : role === 1 ? (
				<div className="bg-white my-3 rounded-lg lg:w-[50%] sm:w-[100%] shadow-lg">
					<EventNotifierEmployees />
				</div>
			) : role === 2 ? (
				<div className="rounded-lg grid justify-items-start">
					<EventNotifierInmediateBoss />
				</div>
			) : role === 3 ? (
				<div className="my-5 rounded-lg lg:w-[40%] sm:w-[100%]">
					<EventNotifierManager />
				</div>
			) : null}
*/