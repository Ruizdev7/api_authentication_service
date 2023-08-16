import { OficialLogo } from "./../assets/SVG"

const FooterDashboard = () => {
  return (
    <div className="bg-[#192954] lg:h-[216px] col-span-6 px-5">
      <div className="grid grid-cols-3 mx-auto mt-[50px] text-[14px] text-white lg:w-[966px]">
        <div className="">
          <OficialLogo />
        </div>
        <div className="m-auto col-span-2 lg:grid lg:grid-cols-3 sm:grid sm:grid-cols-3 lg:text-center">
          <div className="">
            <a
              href={`${import.meta.env.VITE_REDIRECT}/informedConsent-law-1581`}
            >
              <strong>Tratamiento de Datos Personales</strong>
            </a>
          </div>
          <div>
            <strong>Linea Ética</strong>
          </div>
          <div>
            <strong>Comité de Convivencia</strong>
          </div>
        </div>
        <div className="col-span-3 mt-3 lg:w-[966px] text-[12px] mb-[26px]">
          <div className="border-t border-2-white">
            <p className="">
              <strong>
                Copyright © 2023 Econabbis S.A.S. Una sociedad de Plena Global
                Holdings Inc. Todos los derechos reservados. NIT 9009496846
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterDashboard;
