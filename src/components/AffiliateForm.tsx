import { useId, useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import { getPrivacyPolicyPageUrl } from "../utils/shopify";

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const Row = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.div`
  display: grid;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`;

const inputBase = `
  width: 100%;
  min-height: 3rem;
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.38);
  }

  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  ${inputBase}
  font-family: ${({ theme }) => theme.fonts.sans};
  color: ${({ theme }) => theme.colors.text};
  border-color: ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.md};

  &:focus {
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const Select = styled.select`
  ${inputBase}
  font-family: ${({ theme }) => theme.fonts.sans};
  color: ${({ theme }) => theme.colors.text};
  border-color: ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23c9b56a' stroke-width='2'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;

  option {
    background: #111111;
    color: #ffffff;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const Textarea = styled.textarea`
  ${inputBase}
  font-family: ${({ theme }) => theme.fonts.sans};
  color: ${({ theme }) => theme.colors.text};
  border-color: ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 7rem;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.borderSubtle};
  margin-block: 0.5rem;
`;

const SectionLabel = styled.p`
  margin: 0;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldMuted};
`;

const SubmitButton = styled.button`
  justify-self: start;
  margin-top: 0.5rem;
  padding: 1rem 2rem;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.gold};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.88;
  }
`;

const Status = styled.p<{ $error?: boolean }>`
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: ${({ theme, $error }) =>
    $error ? "#ffb4b4" : theme.colors.goldMuted};
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: ${({ theme }) => theme.colors.goldMuted};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.gold};
    }
  }
`;

const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;

type FormState = {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  followers: string;
  avgLikes: string;
  gender: string;
  ageGroup: string;
  focus: string;
  message: string;
  honeypot: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  instagram: "",
  tiktok: "",
  youtube: "",
  followers: "",
  avgLikes: "",
  gender: "",
  ageGroup: "",
  focus: "",
  message: "",
  honeypot: "",
};

export function AffiliateForm() {
  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    instagram: useId(),
    tiktok: useId(),
    youtube: useId(),
    followers: useId(),
    avgLikes: useId(),
    gender: useId(),
    ageGroup: useId(),
    focus: useId(),
    message: useId(),
    honeypot: useId(),
  };

  const [fields, setFields] = useState<FormState>(initial);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (status !== "idle") setStatus("idle");
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fields.honeypot) return;
    setStatus("loading");

    try {
      const response = await fetch("/api/affiliate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "Affiliate form failed");
      }

      setFields(initial);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Honeypot
        id={ids.honeypot}
        name="honeypot"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={fields.honeypot}
        onChange={set("honeypot")}
        aria-hidden="true"
      />

      <SectionLabel>Základní informace</SectionLabel>

      <Row>
        <Field>
          <Label htmlFor={ids.name}>Jméno a příjmení *</Label>
          <Input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Vaše jméno"
            required
            value={fields.name}
            onChange={set("name")}
          />
        </Field>

        <Field>
          <Label htmlFor={ids.email}>E-mail *</Label>
          <Input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vas@email.cz"
            required
            value={fields.email}
            onChange={set("email")}
          />
        </Field>
      </Row>

      <Field>
        <Label htmlFor={ids.phone}>Telefon</Label>
        <Input
          id={ids.phone}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+420 …"
          value={fields.phone}
          onChange={set("phone")}
        />
      </Field>

      <Divider />
      <SectionLabel>Sociální sítě</SectionLabel>

      <Row>
        <Field>
          <Label htmlFor={ids.instagram}>Instagram</Label>
          <Input
            id={ids.instagram}
            name="instagram"
            type="url"
            placeholder="https://instagram.com/…"
            value={fields.instagram}
            onChange={set("instagram")}
          />
        </Field>

        <Field>
          <Label htmlFor={ids.tiktok}>TikTok</Label>
          <Input
            id={ids.tiktok}
            name="tiktok"
            type="url"
            placeholder="https://tiktok.com/@…"
            value={fields.tiktok}
            onChange={set("tiktok")}
          />
        </Field>
      </Row>

      <Field>
        <Label htmlFor={ids.youtube}>YouTube</Label>
        <Input
          id={ids.youtube}
          name="youtube"
          type="url"
          placeholder="https://youtube.com/@…"
          value={fields.youtube}
          onChange={set("youtube")}
        />
      </Field>

      <Divider />
      <SectionLabel>Vaše komunita</SectionLabel>

      <Row>
        <Field>
          <Label htmlFor={ids.followers}>Počet sledujících *</Label>
          <Select
            id={ids.followers}
            name="followers"
            required
            value={fields.followers}
            onChange={set("followers")}
          >
            <option value="">— vyberte —</option>
            <option value="0-999">0 – 999</option>
            <option value="1000-9999">1 000 – 9 999</option>
            <option value="10000-29999">10 000 – 29 999</option>
            <option value="30000-50000">30 000 – 50 000</option>
            <option value="50000-100000">50 000 – 100 000</option>
            <option value="100000+">100 000 a více</option>
          </Select>
        </Field>

        <Field>
          <Label htmlFor={ids.avgLikes}>Průměrný počet lajků</Label>
          <Select
            id={ids.avgLikes}
            name="avgLikes"
            value={fields.avgLikes}
            onChange={set("avgLikes")}
          >
            <option value="">— vyberte —</option>
            <option value="0-100">0 – 100</option>
            <option value="101-500">101 – 500</option>
            <option value="501-1000">501 – 1 000</option>
            <option value="1001-5000">1 001 – 5 000</option>
            <option value="5000+">5 000 a více</option>
          </Select>
        </Field>
      </Row>

      <Row>
        <Field>
          <Label htmlFor={ids.gender}>Převažující pohlaví sledujících</Label>
          <Select
            id={ids.gender}
            name="gender"
            value={fields.gender}
            onChange={set("gender")}
          >
            <option value="">— vyberte —</option>
            <option value="muzi">Muži</option>
            <option value="zeny">Ženy</option>
            <option value="mix">Mix</option>
          </Select>
        </Field>

        <Field>
          <Label htmlFor={ids.ageGroup}>Věková cílová skupina</Label>
          <Select
            id={ids.ageGroup}
            name="ageGroup"
            value={fields.ageGroup}
            onChange={set("ageGroup")}
          >
            <option value="">— vyberte —</option>
            <option value="18-24">18 – 24</option>
            <option value="25-34">25 – 34</option>
            <option value="35-44">35 – 44</option>
            <option value="45+">45 a více</option>
          </Select>
        </Field>
      </Row>

      <Field>
        <Label htmlFor={ids.focus}>Zaměření obsahu *</Label>
        <Select
          id={ids.focus}
          name="focus"
          required
          value={fields.focus}
          onChange={set("focus")}
        >
          <option value="">— vyberte —</option>
          <option value="sport">Sport a fitness</option>
          <option value="zdravi">Zdravý životní styl</option>
          <option value="hubnutí">Hubnutí a dieta</option>
          <option value="wellness">Wellness a biohacking</option>
          <option value="kosmetika">Kosmetika a beauty</option>
          <option value="food">Jídlo a vaření</option>
          <option value="jine">Jiné</option>
        </Select>
      </Field>

      <Divider />

      <Field>
        <Label htmlFor={ids.message}>Řekněte nám něco o sobě</Label>
        <Textarea
          id={ids.message}
          name="message"
          placeholder="Proč chcete spolupracovat s Vojta Hubne? Jak prezentujete obsah své komunitě?"
          value={fields.message}
          onChange={set("message")}
        />
      </Field>

      <SubmitButton type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Odesílám…" : "Odeslat přihlášku"}
      </SubmitButton>

      {status === "success" && (
        <Status role="status">
          Přihláška odeslána — díky! Ozveme se do 3–5 pracovních dnů.
        </Status>
      )}

      {status === "error" && (
        <Status $error role="alert">
          Nepodařilo se odeslat. Zkuste to znovu nebo napište na
          info@vojtahubne.cz.
        </Status>
      )}

      <Hint>
        Odesláním souhlasíte se zpracováním osobních údajů dle{" "}
        <a href={getPrivacyPolicyPageUrl()}>zásad ochrany osobních údajů</a>.
      </Hint>
    </Form>
  );
}
