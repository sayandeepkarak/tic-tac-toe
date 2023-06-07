import { Avatar, Image, InfoText } from "../../style/g_style";
import { MemberBlock, VsBlock } from "./Match.styled";
import VsImage from "../../assets/ttt-vs.png";

const Vs = () => {
  return (
    <>
      <VsBlock>
        <MemberBlock direction="row">
          <Avatar src="https://lh3.googleusercontent.com/a-/ACNPEu-0g44J4xjgYSZKKJDw9Hcs8xTN9uLXCp9VUgSQ=s96-c" />
          <InfoText>Sayandeep Karak</InfoText>
        </MemberBlock>
        <Image height="130px" src={VsImage} />
        <MemberBlock direction="row-reverse">
          <Avatar src="https://lh3.googleusercontent.com/a-/ACNPEu-0g44J4xjgYSZKKJDw9Hcs8xTN9uLXCp9VUgSQ=s96-c" />
          <InfoText>Sayandeep Karak</InfoText>
        </MemberBlock>
      </VsBlock>
    </>
  );
};

export default Vs;
