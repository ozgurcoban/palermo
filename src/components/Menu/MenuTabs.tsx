import { useGetLocale } from "@/config";
import RadioButton from "../ui/RadioButton";

interface MenuTabs {
  tabs: Category[];
  setSelectedTab: React.Dispatch<
    React.SetStateAction<{
      index: number;
      value: string;
    }>
  >;
  selectedTab: number;
}

const MenuTabs: React.FC<MenuTabs> = ({
  tabs,
  selectedTab,
  setSelectedTab,
}) => {
  const locale = useGetLocale();
  return (
    <>
      <div className="w-full mt-6">
        <div className="py-3 w-fit">
          <span className="text-dark font-lato text-sm sm:text-md uppercase tracking-wide whitespace-nowrap cursor-default">
            Our amazing categories
          </span>
        </div>
        <ul className="flex flex-col mt-3 md:gap-2 transition-all duration-200">
          {tabs.map((tab, index) => (
            <li className="flex items-center gap-3" key={tab._id}>
              <RadioButton
                label={tab.title[locale]}
                value={tab._id}
                isSelected={selectedTab === index}
                onRadioChange={() => setSelectedTab({ value: tab._id, index })}
                groupName="categories"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MenuTabs;
