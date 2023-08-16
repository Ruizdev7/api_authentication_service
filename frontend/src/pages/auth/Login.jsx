import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useLoginUserMutation } from "../../redux_app/services/authAPI";
import { useDispatch } from "react-redux";
import {
	setCredentials,
	cleanCredentials,
} from "../../redux_app/role_base_access_control/authSlice";

import { OficialLogo } from "../../assets/SVG";



const Login = () => {
	const [loginColor, setLoginColor] = useState("HHRR");
	const dispatch = useDispatch();
	const [number_id_employee, set_number_id_employee] = useState("");
	const [employee_password, set_employee_password] = useState("");
	const [redirectToHome, setRedirectToHome] = useState(false);
	const [loginUser, { data, isError, isSuccess, error: errorLogin, isLoading }] =
		useLoginUserMutation();
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(import.meta.env.VITE_REDIRECT_HHRR)
		loginUser({
			number_id_employee,
			employee_password,
		});
		console.log(data)

	};
	//useEffect(() => {
	//	dispatch(cleanCredentials());
	//}, []);

	useEffect(() => {
		if (isSuccess) {
			toast.success("🦄 Wow so easy!", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			dispatch(
				setCredentials({
					current_user: {
						ccn_employee: data.current_user.ccn_employee,
						token: data.current_user.token,
						full_name_employee: data.current_user.full_name_employee,
						informed_consent_law_1581:
							data.current_user.informed_consent_law_1581,
					},
					access_level: {
						Type_Relationship: data.access_level.Type_Relationship,
						area: data.access_level.area,
						process: data.access_level.process,
						role: data.access_level.role,
						ccn_role: data.access_level.ccn_role,
					},
				})
			);
			if (loginColor === "HHRR") {
				window.location = "https://sandboxhhrr.plena-global.com/home"
			}
			else if (loginColor === "MTTO") {
				window.location = "http://localhost:5173/home"
			}

		} else if (isError) {
			toast.error(`Error al Ingresar: ${errorLogin.msg}`, {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
		//
	}, [isSuccess, isError]);

	return (
		<>
			<section className="container">
				<div className={loginColor === "HHRR" ? `bg-gradient-to-t via-[#66A59C] from-[#3d6b5c]  w-[416px] h-[257px] mx-auto flex flex-col items-center rounded-t-lg` : loginColor === "MTTO" ? `bg-[#192954] w-[416px] h-[257px] mx-auto flex flex-col items-center rounded-t-lg` : loginColor === "QC" ? `bg-[#736700] w-[416px] h-[257px] mx-auto flex flex-col items-center rounded-t-lg` : null}>
					<OficialLogo className="w-[250px] h-[200px]" />
					<div>
						<h1 className="text-white">IAP | Internal Administration Platform</h1>
					</div>
					<div className="flex gap-5 h-[56px] items-center whitespace-normal">
						<button
							value="RRHH"
							onClick={() => setLoginColor("HHRR")} className="text-white text-sm">Recursos Humanos</button>
						<button
							value="MTTO"
							onClick={() => setLoginColor("MTTO")} className="text-white text-sm">Mantenimiento</button>
						<button
							value="QC"
							onClick={() => setLoginColor("QC")} className="text-white text-sm">Control de Calidad</button>
					</div>
				</div >

				<div className="w-[416px] h-[316px] rounded-b-lg flex flex-col items-center justify-items-center border-2 ">
					<form onSubmit={handleSubmit} className="p-5 space-y-10">
						<div className="relative w-[352px] max-h-[41px]">
							<input
								className="peer h-full w-full rounded-[7px] border-2 border-blue-gray-400 bg-gray-100 px-3 py-2 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#00695A] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
								value={number_id_employee}
								onChange={(e) => set_number_id_employee(e.target.value)}
							/>
							<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:leading-[4] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs peer-focus:leading-tight peer-focus:text-[#00695A] peer-focus:font-semibold peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#00695A] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#00695A] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
								NUMERO DE IDENTIFICACION
							</label>
						</div>
						<div className="relative w-[340px] h-[41px] rounded">
							<input
								className="peer h-full w-full rounded-[7px] border-2 border-blue-gray-400 bg-gray-100 px-3 py-2 font-sans text-base font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#00695A] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
								type="password"
								value={employee_password}
								onChange={(e) => set_employee_password(e.target.value)}
							/>
							<label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-xs leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:leading-[4] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-xs peer-focus:leading-tight peer-focus:text-[#00695A] peer-focus:font-semibold peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#00695A] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#00695A] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
								CONTRASEÑA
							</label>
						</div>
						<div className="flex items-center justify-between">
							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Olvido su contraseña ?
								</a>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="bg-[#00695A] text-white w-[352px] h-[41px] rounded"
							>
								Iniciar Sesion
							</button>
						</div>
					</form>
				</div>
			</section >
		</>
	);
};
export default Login;
