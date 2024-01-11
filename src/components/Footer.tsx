import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2E3D44] text-light">
      <div className="container py-16 flex">
        <div className="flex-1">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
            quibusdam vel molestiae eum veniam rem natus optio eius.
          </p>
          <div>insta</div>
          <div>facebook</div>
        </div>
        <div className="flex-1">
          <div>opening hours</div>
          <div>where to find us</div>
        </div>
      </div>
    </footer>
  );
}
