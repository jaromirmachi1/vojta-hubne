import styled, { keyframes } from "styled-components";
import { LAUNCH_DATE } from "../config/launch";
import { BrandLogo } from "../components/BrandLogo";
import { Countdown } from "../components/Countdown";
import { LaunchBackground } from "../components/backgrounds/LaunchBackground";
import { useCountdown } from "../hooks/useCountdown";

const shimmer = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.95; }
`;

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 100svh;
  padding: clamp(1rem, 3svh, 2rem) clamp(1rem, 4vw, 1.5rem);
  text-align: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.65rem, 2svh, 1.5rem);
  width: min(100%, 56rem);
  max-height: 100%;
  overflow: hidden;
`;

const LogoWrap = styled.div`
  flex-shrink: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    width: min(100%, clamp(9rem, 24vw, 16rem));
    max-height: clamp(4rem, 14svh, 8rem);
    height: auto;
    object-fit: contain;
  }
`;

const Eyebrow = styled.p`
  margin: 0;
  flex-shrink: 0;
  font-size: 0.65rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
  animation: ${shimmer} 4s ease-in-out infinite;
`;

const Title = styled.h1`
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 4.5vw, 2.25rem);
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`;

const Tagline = styled.p`
  margin: 0;
  flex-shrink: 1;
  max-width: 26rem;
  font-size: clamp(0.8rem, 2vw, 0.95rem);
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.text};

  @media (max-height: 640px) {
    display: none;
  }
`;

const Divider = styled.hr`
  flex-shrink: 0;
  width: min(12rem, 40vw);
  margin: 0;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CountdownWrap = styled.div`
  flex-shrink: 0;
  width: min(100%, 36rem);
`;

const FooterNote = styled.p`
  margin: 0;
  flex-shrink: 0;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`;

export function LaunchHeroSection() {
  const countdown = useCountdown(LAUNCH_DATE);

  return (
    <Section>
      <LaunchBackground />
      <Inner>
        <Eyebrow>Již brzy</Eyebrow>
        <LogoWrap>
          <BrandLogo />
        </LogoWrap>
        <Title>Spouštíme brzy</Title>
        <Tagline>
          Reálná transformace, na které stojí celá značka. Teď přinášíme
          prémiové doplňky — pro ty, kteří chtějí jít stejnou cestou.
        </Tagline>
        <Divider />
        {countdown.isComplete ? (
          <Title>Jsme online</Title>
        ) : (
          <CountdownWrap>
            <Countdown values={countdown} compact />
          </CountdownWrap>
        )}
        <FooterNote>Pocit sytosti · Hubnutí · Regenerace</FooterNote>
      </Inner>
    </Section>
  );
}
