import Logo from "../../assets/ttt-logo.png";
import IconButton from "../IconButton";
import { Head, Icon } from "./Header.styled";
import { Avatar, Image, InfoText } from "../../style/g_style";
import { InfoRow } from "../../pages/Dashboard/Dashboard.styled";

type props = {
  isVerified: boolean;
  isOpen: boolean;
  setOpen: () => void;
  btnIcon: string;
};

const Header = ({ isOpen, setOpen, btnIcon, isVerified }: props) => {
  return (
    <>
      <Head>
        {isVerified ? (
          <InfoRow>
            <Avatar src="https://lh3.googleusercontent.com/a-/ACNPEu-0g44J4xjgYSZKKJDw9Hcs8xTN9uLXCp9VUgSQ=s96-c" />
            <InfoText>Sayandeep Karak</InfoText>
          </InfoRow>
        ) : (
          <Image src={Logo} height={"100px"} />
        )}
        <IconButton click={setOpen}>
          <Icon isOpen={isOpen} src={btnIcon} />
        </IconButton>
      </Head>
    </>
  );
};

export default Header;
