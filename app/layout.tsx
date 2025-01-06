import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "weRent",
  description: "Ērta platforma preču nomai.",
};

const localization = {
  backButton: "Atpakaļ",
  unstable__errors: {
    form_password_incorrect:
      "Ievadītā parole nav pareiza. Lūdzu, mēģiniet vēlreiz.",
    form_code_incorrect: "Nepareizs kods",
    form_code_correct: "Veiksmīgs",
    form_password_pwned:
      "Šī parole ir konstatēta kā daļa no pārkāpuma, un to nevar izmantot. Lūdzu, mēģiniet citu paroli.",
    passwordComplexity: {
      maximumLength: "mazāk nekā {{length}} rakstzīmes",
      minimumLength: "{{length}} vai vairāk rakstzīmju",
      requireLowercase: "mazais burts",
      requireNumbers: "skaitlis",
      requireSpecialCharacter: "īpaša rakstzīme",
      requireUppercase: "lielais burts",
      sentencePrefix: "Jūsu parolei ir jāietver",
    },
    zxcvbn: {
      goodPassword: "Jūsu parole atbilst visām nepieciešamajām prasībām.",
    },
  },
  dividerText: "vai",
  formFieldAction__forgotPassword: "Aizmirsāt paroli?",
  formFieldLabel__newPassword: 'Jauna parole',
  formFieldLabel__confirmPassword: 'Apstipriniet paroli',
  formFieldLabel__signOutOfOtherSessions: 'Izrakstieties no visām pārējām ierīcēm',
  formFieldError__notMatchingPasswords: "Paroles nesakrīt.",
  formFieldError__matchingPasswords: 'Paroles atbilst.',
  footerActionLink__useAnotherMethod: "Izmantojiet citu metodi",
  formFieldLabel__emailAddress: "E-pasta adrese",
  formFieldInputPlaceholder__emailAddress: "Ievadiet savu e-pasta adresi",
  formFieldLabel__password: "Parole",
  formFieldInputPlaceholder__password: "Ievadiet savu paroli",
  formButtonPrimary: "Turpināt",
  socialButtonsBlockButton: "Turpināt ar {{provider|titleize}}",
  signUp: {
    emailCode: {
      title: "Apstipriniet savu e-pastu",
      subtitle: "Ievadiet uz jūsu e-pastu nosūtīto verifikācijas kodu",
      resendButton: "Vai nesaņēmāt kodu? Atkārtoti nosūtīt",
    },
    start: {
      actionLink: "Pierakstīties",
      actionText: "Vai jums jau ir konts?",
      title: "Izveidojiet savu kontu",
      subtitle: "Laipni lūdzam! Lūdzu, aizpildiet informāciju, lai sāktu.",
    },
  },
  signIn: {
    signInEnterPasswordTitle: "Ievadiet savu paroli",
    password: {
      actionLink: "Izmantojiet citu metodi",
      title: "Ievadiet savu paroli",
      subtitle: "Ievadiet ar jūsu kontu saistīto paroli",
    },
    start: {
      actionLink: "Reģistrēties",
      actionText: "Vai jums nav konta?",
      title: "Pierakstieties",
      subtitle: "Laipni lūdzam atpakaļ! Lūdzu, pierakstieties, lai turpinātu",
    },
    alternativeMethods: {
      title: "Izmantojiet citu metodi",
      subtitle:
        "Vai saskaras ar problēmām? Lai pierakstītos, varat izmantot jebkuru no šīm metodēm.",
      actionText: "Vai jums nav neviena no šiem?",
      actionLink: "Saņemiet palīdzību",
    },
    forgotPasswordAlternativeMethods: {
      blockButton__resetPassword: "Atiestatiet savu paroli",
      label__alternativeMethods:
        "Vai arī pierakstieties, izmantojot citu metodi",
      title: "Aizmirsāt paroli?",
    },
    forgotPassword: {
      resendButton: "Vai nesaņēmāt kodu? Atkārtoti nosūtīt",
      subtitle_email: 'Vispirms ievadiet kodu, kas nosūtīts uz jūsu e-pasta adresi',
      title: 'Atiestatīt paroli',
    },
    resetPassword: {
      title: "Iestatiet jaunu paroli",
      successMessage: 'Jūsu parole tika veiksmīgi nomainīta.Lūdzu, uzgaidiet brīdi.',
      formButtonPrimary: 'Atiestatīt paroli',
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <Navbar />
            <main className="container py-4">{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
