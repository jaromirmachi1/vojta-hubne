import { useCallback, useEffect, useId, useState } from "react";
import type { FormEvent } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import tabloidImage from "../assets/tabloid.png";
import { eyebrowText } from "../styles/eyebrow";
import {
  markNewsletterPopupDismissed,
  markNewsletterPopupShown,
  markNewsletterPopupSubscribed,
  shouldShowNewsletterPopup,
} from "../utils/newsletterPopup";
import { getShopifyPolicyUrl } from "../utils/shopify";
import { subscribeToNewsletter } from "../utils/subscribeToNewsletter";

const OPEN_DELAY_MS = 8000;
const SCROLL_TRIGGER_RATIO = 0.35;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
`;

const Dialog = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1fr);
  width: min(100%, 48rem);
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.surfaceRaised};
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    width: min(100%, 25.5rem);
  }
`;

const ProductPanel = styled.div`
  display: flex;
  min-height: 100%;
  background:
    radial-gradient(
      circle at 50% 35%,
      rgba(238, 220, 130, 0.18),
      transparent 38%
    ),
    #000;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 13rem;
  }
`;

const ProductImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 29rem;
  object-fit: cover;
  object-position: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 13rem;
    max-height: 16rem;
  }
`;

const ContentPanel = styled.div`
  padding: clamp(1.35rem, 4vw, 1.85rem);
  background:
    linear-gradient(145deg, rgba(238, 220, 130, 0.12), transparent 55%),
    ${({ theme }) => theme.colors.surfaceRaised};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    border-color: ${({ theme }) => theme.colors.border};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const Eyebrow = styled.p`
  margin: 0;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  ${eyebrowText}
`;

const BrandRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.85rem;
  padding-right: 2rem;
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.6rem, 5.6vw, 2.2rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.gold};
`;

const BenefitList = styled.ul`
  margin: 0 0 1.1rem;
  padding: 0;
  display: grid;
  gap: 0.45rem;
  list-style: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  line-height: 1.45;

  li {
    display: flex;
    align-items: center;
    gap: 0.55rem;
  }

  li::before {
    content: "";
    flex: 0 0 0.38rem;
    width: 0.38rem;
    height: 0.38rem;
    border-radius: ${({ theme }) => theme.radii.pill};
    background: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 0 0 0.2rem rgba(238, 220, 130, 0.1);
  }
`;

const Form = styled.form`
  display: grid;
  gap: 0.75rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: 0.65rem;
`;

const EmailInput = styled.input`
  width: 100%;
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.colors.goldMuted};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font: inherit;
  font-size: 0.875rem;
  padding: 0.72rem 0.95rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 2.75rem;
  padding-inline: 1rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font: inherit;
  font-size: 0.69rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: #f4e28d;
    box-shadow: 0 10px 24px rgba(238, 220, 130, 0.22);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 6px 14px rgba(238, 220, 130, 0.18);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const Status = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 0.8rem;
  line-height: 1.45;
  color: ${({ theme, $error }) =>
    $error ? "#ffb4b4" : theme.colors.goldMuted};
`;

const Hint = styled.p`
  margin: 0.85rem 0 0;
  font-size: 0.72rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: ${({ theme }) => theme.colors.goldMuted};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.gold};
  }
`;

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function NewsletterPopup() {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const closePopup = useCallback(() => {
    markNewsletterPopupDismissed();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!shouldShowNewsletterPopup()) return;

    let hasOpened = false;

    const openPopup = () => {
      if (hasOpened || !shouldShowNewsletterPopup()) return;

      hasOpened = true;
      markNewsletterPopupShown();
      setIsOpen(true);
    };

    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) return;

      const scrollRatio = window.scrollY / scrollableHeight;
      if (scrollRatio >= SCROLL_TRIGGER_RATIO) {
        openPopup();
      }
    };

    const timer = window.setTimeout(() => {
      openPopup();
    }, OPEN_DELAY_MS);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closePopup]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      await subscribeToNewsletter(value, {
        offer: "discount",
        source: "popup",
      });
      setEmail("");
      setStatus("success");
      markNewsletterPopupSubscribed();
      window.setTimeout(() => setIsOpen(false), 1400);
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClick={closePopup}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton type="button" onClick={closePopup} aria-label="Zavřít">
          <CloseIcon />
        </CloseButton>

        <ProductPanel>
          <ProductImage
            src={tabloidImage}
            alt="Balíček produktů Vojta Hubne"
            width={1024}
            height={682}
          />
        </ProductPanel>

        <ContentPanel>
          <BrandRow>
            <Eyebrow>Vojta Hubne</Eyebrow>
          </BrandRow>
          <Title id={titleId}>
            Získejte <Highlight>200 Kč</Highlight> na první nákup
          </Title>
          <BenefitList>
            <li>Novinky a tipy jako první</li>
            <li>Exkluzivní nabídky pouze pro členy</li>
          </BenefitList>

          <Form onSubmit={handleSubmit}>
            <InputRow>
              <EmailInput
                type="email"
                name="email"
                autoComplete="email"
                placeholder="E-mail"
                aria-label="E-mail pro slevu 200 Kč"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                required
              />
            </InputRow>

            <SubmitButton
              type="submit"
              aria-label="Získat 200 Kč na první objednávku"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Odesílám…" : "Chci 200 Kč"}
            </SubmitButton>

            {status === "success" ? (
              <Status role="status">
                Děkujeme, jste v naší komunitě. Sleva 200 Kč je vaše.
              </Status>
            ) : null}

            {status === "error" ? (
              <Status $error role="alert">
                Nepodařilo se e-mail přihlásit. Zkuste to prosím znovu.
              </Status>
            ) : null}
          </Form>

          <Hint>
            Odesláním souhlasíte se{" "}
            <a href={getShopifyPolicyUrl("privacy-policy")}>
              zpracováním osobních údajů
            </a>
            . Na uvedený e-mail obdržíte kupón se slevou 200 Kč.
          </Hint>
        </ContentPanel>
      </Dialog>
    </Overlay>,
    document.body,
  );
}
