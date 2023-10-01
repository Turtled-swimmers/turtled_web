export default function useGetMedal() {
  const MEDAL = [
    {
      title: "열심 거북",
      content: "나는야 성실한 성실 거북~! 매일 매일 스트레칭을 할꺼야 달성 조건: 1일 1스트레칭 연속 5회",
      image: "https://item.kakaocdn.net/do/5aaae703d85171ffffa9400e3847926f9f5287469802eca457586a25a096fd31",
    },
    {
      title: "성실 거북",
      content: "열심히 달리는 열심 거북 작심삼일! 열심히 해봐야지! 달성 조건: 3회 이상 스트레칭",
      image: "https://item.kakaocdn.net/do/5aaae703d85171ffffa9400e3847926ff604e7b0e6900f9ac53a43965300eb9a",
    },
    {
      title: "의지 거북",
      content: "의지 넘치는 의지 거북 한다면 한다~! 스트레칭 해보자고 달성 조건: 10회 이상 스트레칭",
      image: "https://item.kakaocdn.net/do/5aaae703d85171ffffa9400e3847926f8f324a0b9c48f77dbce3a43bd11ce785",
    },
  ];

  return { medalData: MEDAL };
}
