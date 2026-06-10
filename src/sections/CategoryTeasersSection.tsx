import styled from "styled-components";
import { HashLink } from "../components/HashLink";
import vitalityImage from "../assets/vitality.png";
import saltedkarImage from "../assets/saltedkar.png";
import vitalbundleImage from "../assets/vitalbundle.png";
import { PageContainer } from "../components/PageContainer";
import { eyebrowText } from "../styles/eyebrow";

const teasers = [
  {
    title: "Doplňky stravy",
    text: "GLP-1 Support — kapsle pro energii, spalování a kontrolu chuti.",
    sectionId: "produkty",
    image: vitalityImage,
    imageAlt: "Doplňky stravy Vojta Hubne — Aquamin Mg a D3 + K2",
  },
  {
    title: "Proteiny & shaky",
    text: "Lean Shake GLP-1 — 22 g bílkovin, vláknina a vitamíny v jedné dávce.",
    sectionId: "produkty",
    image: saltedkarImage,
    imageAlt: "Lean Shake GLP-1 slaný karamel — proteinový shake",
  },
  {
    title: "Péče o tělo",
    text: "Regenerační krémy s GHK-Cu pro pocit sytosti a obnovu pokožky.",
    sectionId: "produkty",
    image: vitalbundleImage,
    imageAlt: "Péče o tělo — GHK-Cu cream a Antiage cream",
  },
];

const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionPaddingY};
`;

const Inner = styled(PageContainer)``;

const Title = styled.h2`
  margin: 0 0 2rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(HashLink)`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  overflow: hidden;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    transform: translateY(-2px);
  }
`;

const CardBody = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
`;

const CardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
`;

const ImageWrap = styled.div`
  flex-shrink: 0;
  width: clamp(4.5rem, 28%, 6.5rem);
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gold};
`;

const CardText = styled.p`
  margin: 0;
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const CardCta = styled.span`
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  ${eyebrowText}
`;

export function CategoryTeasersSection() {
  return (
    <Section>
      <Inner>
        <Title>Prozkoumej kategorie</Title>
        <Grid>
          {teasers.map((teaser) => (
            <Card key={teaser.title} sectionId={teaser.sectionId}>
              <CardBody>
                <CardContent>
                  <CardTitle>{teaser.title}</CardTitle>
                  <CardText>{teaser.text}</CardText>
                  <CardCta>Zobrazit produkty →</CardCta>
                </CardContent>
                <ImageWrap>
                  <Image src={teaser.image} alt={teaser.imageAlt} loading="lazy" />
                </ImageWrap>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Inner>
    </Section>
  );
}
