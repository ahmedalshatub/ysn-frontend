import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState } from "../../../app/store";
import { toggleTheme } from "../../../core/slices/theme.slice";

import Button from "../../../shared/components/buttons/Button";
import Switch from "../../../shared/components/buttons/Switch";
import Tabs from "../../../shared/components/navigation/Tabs";
import type { TabItem } from "../../../shared/components/navigation/Tabs";

import ButtonsTab from "../components/ButtonsTab";
import InputsTab from "../components/InputsTab";
import SelectsTab from "../components/SelectsTab";
import TablesTab from "../components/TablesTab";
import CardsTab from "../components/CardsTab";
import NavigationTab from "../components/NavigationTab";
import MediaTab from "../components/MediaTab";
import ModalsTab from "../components/ModalsTab";
import DisplayTab from "../components/DisplayTab";
import ChartsTab from "../components/ChartsTab";
import FeedbackTab from "../components/FeedbackTab";
import ComponentIcon from "../../../assets/icons/ComponentIcon";
import EditIcon from "../../../assets/icons/EditIcon";
import ArrowUpDownIcon from "../../../assets/icons/ArrowUpDownIcon";
import GridIcon from "../../../assets/icons/GridIcon";
import LayoutDashboardIcon from "../../../assets/icons/LayoutDashboardIcon";
import MenuIcon from "../../../assets/icons/MenuIcon";
import ImageIcon from "../../../assets/icons/ImageIcon";
import InfoIcon from "../../../assets/icons/InfoIcon";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import BarChartIcon from "../../../assets/icons/BarChartIcon";
import SpinnerIcon from "../../../assets/icons/SpinnerIcon";

const ComponentShowcase = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const currentLang = i18n.language;

  const handleLangToggle = useCallback(() => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  }, [currentLang, i18n]);

  const ico = "w-4 h-4";

  const showcaseTabs: TabItem[] = [
    {
      id: "buttons",
      label: "Buttons & Badges",
      icon: <ComponentIcon className={ico} />,
      content: <ButtonsTab />,
    },
    {
      id: "inputs",
      label: "Inputs",
      icon: <EditIcon className={ico} />,
      content: <InputsTab />,
    },
    {
      id: "selects",
      label: "Selects",
      icon: <ArrowUpDownIcon className={ico} />,
      content: <SelectsTab />,
    },
    {
      id: "tables",
      label: "Tables",
      icon: <GridIcon className={ico} />,
      content: <TablesTab />,
    },
    {
      id: "cards",
      label: "Cards",
      icon: <LayoutDashboardIcon className={ico} />,
      content: <CardsTab />,
    },
    {
      id: "navigation",
      label: "Navigation",
      icon: <MenuIcon className={ico} />,
      content: <NavigationTab />,
    },
    {
      id: "media",
      label: "Media",
      icon: <ImageIcon className={ico} />,
      content: <MediaTab />,
    },
    {
      id: "modals",
      label: "Modals & Feedback",
      icon: <InfoIcon className={ico} />,
      content: <ModalsTab />,
    },
    {
      id: "display",
      label: "Display",
      icon: <CalendarIcon className={ico} />,
      content: <DisplayTab />,
    },
    {
      id: "charts",
      label: "Charts",
      icon: <BarChartIcon className={ico} />,
      content: <ChartsTab />,
    },
    {
      id: "feedback",
      label: "Loading",
      icon: <SpinnerIcon className={ico} />,
      content: <FeedbackTab />,
    },
  ];

  return (
    <div className="min-h-screen sc-page">
      <header className="sc-header sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold sc-heading">Component Showcase</h1>
            <p className="text-xs sc-subtext hidden sm:block">All components in one place</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              outline
              size="sm"
              label={currentLang === "ar" ? "EN" : "AR"}
              onClick={handleLangToggle}
            />
            <Switch
              variant="dark"
              size="sm"
              checked={themeMode === "dark"}
              onChange={() => dispatch(toggleTheme())}
              label={themeMode === "dark" ? "Dark" : "Light"}
              labelPosition="left"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs tabs={showcaseTabs} variant="pills" color="primary" size="sm" />
      </main>
    </div>
  );
};

export default ComponentShowcase;
