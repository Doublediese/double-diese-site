import { useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Adresse email affichée en clair avec un bouton « Copier ».
 * Filet de sécurité pour les visiteurs dont l'ordinateur n'a pas de messagerie
 * associée aux liens mailto (Gmail ou Outlook dans le navigateur, par exemple).
 */
const AdresseEmail = ({ email, sujet, className = "" }: { email: string; sujet?: string; className?: string }) => {
  const [copie, setCopie] = useState(false);
  const mailto = `mailto:${email}${sujet ? `?subject=${encodeURIComponent(sujet)}` : ""}`;

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const t = document.createElement("textarea");
      t.value = email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopie(true);
    setTimeout(() => setCopie(false), 2500);
  };

  return (
    <span className={`inline-flex flex-wrap items-center justify-center gap-3 font-body ${className}`}>
      <a href={mailto} className="hover:text-primary transition-colors break-all">
        {email}
      </a>
      <button
        type="button"
        onClick={copier}
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-gold-dark transition-colors"
        aria-label="Copier l'adresse email"
      >
        {copie ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copie ? "Adresse copiée" : "Copier l'adresse"}
      </button>
    </span>
  );
};

export default AdresseEmail;
