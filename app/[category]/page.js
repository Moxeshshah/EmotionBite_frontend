import { notFound } from "next/navigation";
import ClosureLogin from "../closure/login/page";
import AnniversaryLogin from "../anniversary/login/page";
import ApologyLogin from "../apology/login/page";
import CongratsLogin from "../congrats/login/page";
import FirstStepLogin from "../approach/login/page";
import LoveLogin from "../love/login/page"; 
import ForeverStartLogin from "../propose/login/page";

const themes = {
  anniversary: AnniversaryLogin,
  apology: ApologyLogin,
  congrats: CongratsLogin,
  approach: FirstStepLogin,
  propose: ForeverStartLogin,
  love: LoveLogin,
  closure: ClosureLogin,
};

export default async function CategoryPage({ params }) {
  const { category } = await params;   // 👈 FIX HERE

  const ThemeComponent = themes[category];

  if (!ThemeComponent) return notFound();

  return <ThemeComponent />;
}



