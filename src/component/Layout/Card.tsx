import { IconType } from "react-icons";
import { FiCreditCard, FiMail, FiUser, FiUsers } from "react-icons/fi";

const Cards = () => {
  return (
    <div className=" m-28 p-4">
      <p className="text-black text-xl font-semibold mb-2">Settings</p>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card
          title="Account"
          subtitle="Manage profile"
          Icon={FiUser}
        />
        <Card title="Email" subtitle="Manage email"  Icon={FiMail} />
        <Card title="Team" subtitle="Manage team"  Icon={FiUsers} />
        <Card
          title="Billing"
          subtitle="Manage cards"
          
          Icon={FiCreditCard}
        />
      </div>
    </div>
  );
};

interface CardType {
  title: string;
  subtitle: string;
  Icon: IconType;
}

const Card = ({ title, subtitle, Icon }: CardType) => {
  return (
    <div
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-violet-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-violet-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </div>
  );
};

export default Cards;