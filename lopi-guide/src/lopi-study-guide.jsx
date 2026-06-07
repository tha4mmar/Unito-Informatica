import { useState } from "react";

const chapters = [
  {
    id: "syntax",
    title: "0.1 Syntax",
    color: "#e63946",
    exercises: [
      {
        range: "0.1.1–0.1.6",
        title: "Prove 0 < size(f) o 1 ≤ size(f)",
        tag: "Induzione strutturale – caso base",
        strategy: `STRUTTURA GENERALE (identica per tutti i casi):
1. Formula l'ipotesi induttiva (IH): "Per ogni sottiformula g di f, 0 < size(g)" (o ≥1).
2. Scegli il caso da dimostrare, es. f = And f1 f2.
3. Per definizione: size(And f1 f2) = 1 + size(f1) + size(f2).
4. Per IH: size(f1) ≥ 1 e size(f2) ≥ 1, dunque size(f1) + size(f2) ≥ 2.
5. Quindi size(And f1 f2) = 1 + size(f1) + size(f2) ≥ 3 > 0. ✓

ATTENZIONE alle varianti:
• "0 < size(f)" e "1 ≤ size(f)" sono equivalenti su ℕ → stessa dimostrazione.
• Per Not f': size = 1 + size(f') ≥ 1 + 1 = 2 > 0 (basta IH su f').
• Per And/Or/Imp f1 f2: si usano entrambe le IH su f1 e f2.`,
      },
      {
        range: "0.1.7–0.1.9",
        title: "Prove d1(f) ≤ d2(f)",
        tag: "Induzione – confronto tra due misure di profondità",
        strategy: `IPOTESI INDUTTIVA: "Per ogni g: d1(g) ≤ d2(g)".

Caso f = Not f':
  d1(Not f') = 1 + d1(f')  ≤  1 + d2(f')  [per IH su f']  = d2(Not f'). ✓

Caso f = And f1 f2:
  d1 = 1 + max(d1(f1), d1(f2))
  Per IH: d1(f1) ≤ d2(f1) e d1(f2) ≤ d2(f2)
  ⟹ max(d1 f1, d1 f2) ≤ max(d2 f1, d2 f2) ≤ d2(f1) + d2(f2)
  ⟹ d1(And f1 f2) ≤ 1 + d2(f1) + d2(f2) = d2(And f1 f2). ✓

  LEMMA CHIAVE usato: max(a,b) ≤ a + b (vero per a,b ≥ 0).

Caso f = Or f1 f2: identico ad And.`,
      },
      {
        range: "0.1.10–0.1.13",
        title: "Prove ht(f) = d(f)",
        tag: "Induzione – equivalenza tra height e depth",
        strategy: `IH: "Per ogni g: m = ht(g) ⟹ m = d(g)".

Caso f = Imp f1 f2:
  Sia n = ht(Imp f1 f2). Per def di Prop_n:
    Imp f1 f2 ∈ Prop_n ⟹ f1,f2 ∈ Prop_{n-1}
    ⟹ ht(f1) ≤ n-1 e ht(f2) ≤ n-1,
    e almeno uno vale n-1 (per minimalità di n).
  Per IH: d(f1) = ht(f1) ≤ n-1 e d(f2) = ht(f2) ≤ n-1.
  Quindi: d(Imp f1 f2) = 1 + max(d f1, d f2) = 1 + (n-1) = n. ✓

Caso f = Not g: ht(Not g) = ht(g) + 1 (per costruzione di Prop_{n+1}).
  Per IH: d(g) = ht(g) = n-1.
  Dunque d(Not g) = 1 + d(g) = n. ✓

Casi And/Or: analoghi a Imp.`,
      },
    ],
  },
  {
    id: "comb",
    title: "0.2 Combinatorial Semantics",
    color: "#2a9d8f",
    exercises: [
      {
        range: "0.2.1–0.2.5",
        title: "evTF f a = b ⟹ ev01 f i = n",
        tag: "Corrispondenza bool ↔ {0,1}",
        strategy: `SCHEMA: si assume l'IH su entrambe le sottoformule, poi si ragiona per casi sul risultato.

Es. Prove "evTF (And f1 f2) a = false ⟹ ev01 (And f1 f2) i = 0":
  evTF (And f1 f2) a = false
  ⟺ (evTF f1 a) && (evTF f2 a) = false
  ⟺ evTF f1 a = false  OR  evTF f2 a = false  [semantica &&]
  Caso evTF f1 a = false: per IH → ev01 f1 i = 0
    ⟹ min(ev01 f1 i, ev01 f2 i) = min(0, _) = 0. ✓
  Caso evTF f2 a = false: simmetrico. ✓

Es. "evTF (And f1 f2) a = true ⟹ ev01 (And f1 f2) i = 1":
  && = true ⟺ entrambi true
  Per IH: ev01 f1 i = 1 e ev01 f2 i = 1
  ⟹ min(1,1) = 1. ✓

ATTENZIONE Imp: ev01 usa max(1 - ev01 f1, ev01 f2).
  L'IH richiede ENTRAMBE le direzioni (true e false) su f1 e f2.`,
      },
      {
        range: "0.2.6–0.2.7",
        title: "ev01 f i = n ⟹ evTF f a = b",
        tag: "Direzione inversa: {0,1} → bool",
        strategy: `Direzione inversa rispetto agli esercizi 0.2.1-0.2.5.

Es. "ev01 (Not g) i = 1 ⟹ evTF (Not g) a = true":
  ev01(Not g) = 1 - ev01(g) = 1 ⟹ ev01(g) = 0
  Per IH (ipotesi data): ev01 g i = 0 ⟹ evTF g a = false
  ⟹ evTF (Not g) a = neg false = true. ✓

Es. "ev01 (And f1 f2) i = 1 ⟹ evTF (And f1 f2) a = true":
  min(ev01 f1, ev01 f2) = 1 ⟹ ev01 f1 = 1 e ev01 f2 = 1 (poiché valori in {0,1})
  Per IH: evTF f1 a = true e evTF f2 a = true
  ⟹ (evTF f1 a) && (evTF f2 a) = true. ✓`,
      },
      {
        range: "0.2.8–0.2.17",
        title: "Semantica insiemistica j° vs semantica booleana ⟦·⟧",
        tag: "Corrispondenza {∅,U} ↔ {F,T}",
        strategy: `CHIAVE: j(A) = U ⟺ a(A) = T (ipotesi base sulle variabili).

Direzione ⟦f⟧ = T ⟹ j°(f) = U:
  Caso ∨: ⟦f1 ∨ f2⟧ = T ⟹ ⟦f1⟧=T OR ⟦f2⟧=T
    Per IH: j°(f1)=U OR j°(f2)=U
    ⟹ j°(f1)∪j°(f2) = U. ✓
  Caso ∧: ⟦f1 ∧ f2⟧=T ⟹ entrambi T, per IH entrambi U
    ⟹ j°(f1)∩j°(f2) = U∩U = U. ✓
  Caso →: usa IH su entrambe le direzioni (T e F su f1).
  Caso ¬g: ⟦¬g⟧=T ⟹ ⟦g⟧=F ⟹ j°(g)=∅
    ⟹ j°(¬g) = U\∅ = U. ✓
  Caso variabile B: diretto dalla ipotesi base a(B)=T ⟺ j(B)=U.

Direzione j°(f)=U ⟹ ⟦f⟧=T: analoga e simmetrica.`,
      },
    ],
  },
  {
    id: "relational",
    title: "0.3 Relational Semantics",
    color: "#457b9d",
    exercises: [
      {
        range: "0.3.1",
        title: "a |= f ⟹ a |= ¬¬f",
        tag: "Senza induzione – costruzione diretta",
        strategy: `NON serve induzione. È una costruzione diretta con le regole.

Prova:
  Supponi a |= f.
  Vogliamo a |= ¬¬f = Not(Not f).
  Per (model_Not): basta mostrare a ̸|= Not f, cioè unModel a (Not f).
  Per (unModel_Not): basta mostrare a |= f.
  Ma a |= f è l'ipotesi. ✓

Struttura derivazione:
  ————————— (Hyp: a |= f)
  a |= f
  ————————— (unModel_Not)
  a ̸|= Not f
  ————————— (model_Not)
  a |= Not(Not f)`,
      },
      {
        range: "0.3.2–0.3.5",
        title: "a |= f AND a ̸|= f ⟹ ⊥",
        tag: "Contraddizione per inversione delle regole",
        strategy: `METODO: si invertono (case-split) entrambe le ipotesi e si trova la contraddizione.

Caso f = f1 ∧ f2:
  a |= And f1 f2: per (model_And) → a |= f1 e a |= f2.
  a ̸|= And f1 f2: per (unModel_And_l) → a ̸|= f1
                  OPPURE (unModel_And_r) → a ̸|= f2.
  In entrambi i casi: a |= fi e a ̸|= fi per qualche i → contraddizione per IH. ✓

Caso f = f1 ∨ f2:
  a |= Or: model_Or_l (a |= f1) o model_Or_r (a |= f2).
  a ̸|= Or: unModel_Or → a ̸|= f1 e a ̸|= f2.
  Contraddizione: a |= f1 e a ̸|= f1. ✓

Caso f = ¬g:
  a |= Not g → unModel g (tramite model_Not)
  a ̸|= Not g → model g (tramite unModel_Not)
  Quindi: a |= g e a ̸|= g → IH su g → ⊥. ✓

Caso f = f1 → f2:
  a |= Imp: model_Imp_l (a ̸|= f1) o model_Imp_r (a |= f2).
  a ̸|= Imp: unModel_Imp → a |= f1 e a ̸|= f2.
  Se model_Imp_l: a ̸|= f1 e a |= f1 → IH. ✓
  Se model_Imp_r: a |= f2 e a ̸|= f2 → IH. ✓`,
      },
      {
        range: "0.3.6",
        title: "f = variabile p",
        tag: "Caso base della contraddizione",
        strategy: `Caso f = Var p:
  a |= Var p → (model_Var) → a p = true.
  a ̸|= Var p → (unModel_Var) → a p = false.
  Ma true ≠ false → contraddizione nell'uguaglianza. ✓

Questo è il caso BASE della dimostrazione per induzione strutturale
(le variabili non hanno sottoformule).`,
      },
      {
        range: "0.3.7–0.3.9",
        title: "¬(a |= f) ⟹ a ̸|= f",
        tag: "Negazione classica vs relazione sintattica ̸|=",
        strategy: `Questa è la direzione "completezza della ̸|=":
se nessuna regola deriva a |= f, allora possiamo derivare a ̸|= f.

Caso f = ¬g:
  ¬(a |= Not g): nessuna regola model_Not si applica, quindi a ̸|= unModel g
  Per esclusione (terzo escluso su g): a ̸|= g, dunque a |= g (è l'unica alternativa).
  Quindi (unModel_Not): a ̸|= Not g. ✓

Caso f = f1 ∧ f2:
  ¬(a |= And f1 f2): non si applica model_And, quindi ¬(a |= f1) o ¬(a |= f2).
  Per IH: a ̸|= f1 o a ̸|= f2.
  Per unModel_And_l/r: a ̸|= And f1 f2. ✓

Caso f = f1 ∨ f2:
  ¬(a |= Or f1 f2): né model_Or_l né model_Or_r, quindi ¬(a |= f1) e ¬(a |= f2).
  Per IH: a ̸|= f1 e a ̸|= f2.
  Per unModel_Or: a ̸|= Or f1 f2. ✓`,
      },
    ],
  },
  {
    id: "opvsrel",
    title: "0.4 Operational vs Relational",
    color: "#8338ec",
    exercises: [
      {
        range: "0.4.1–0.4.3",
        title: "evTF f a = true ⟹ a |= f (Soundness)",
        tag: "Correttezza dell'interprete – direzione positiva",
        strategy: `METODO: si svolge il calcolo di evTF, si usa l'IH sui pezzi, si costruisce la derivazione |=.

Caso f = f1 ∨ f2:
  evTF (Or f1 f2) a = orb(evTF f1 a)(evTF f2 a) = true
  ⟺ evTF f1 a = true  OR  evTF f2 a = true.
  Caso evTF f1 a = true: per IH → a |= f1 → (model_Or_l) → a |= Or f1 f2. ✓
  Caso evTF f2 a = true: per IH → a |= f2 → (model_Or_r) → a |= Or f1 f2. ✓

Caso f = f1 ∧ f2:
  andb = true ⟺ entrambi true.
  Per IH: a |= f1 e a |= f2 → (model_And) → a |= And f1 f2. ✓

Caso f = f1 → f2:
  orb(negb(evTF f1 a))(evTF f2 a) = true
  ⟺ evTF f1 a = false  OR  evTF f2 a = true.
  Se false: per IH(false) → a ̸|= f1 → (model_Imp_l). ✓
  Se true:  per IH(true)  → a |= f2  → (model_Imp_r). ✓`,
      },
      {
        range: "0.4.4–0.4.6",
        title: "evTF f a = false ⟹ a ̸|= f (Soundness negativa)",
        tag: "Correttezza – direzione negativa",
        strategy: `METODO: simmetrico alla direzione positiva, si costruisce unModel.

Caso f = f1 ∨ f2:
  orb = false ⟺ evTF f1 a = false e evTF f2 a = false.
  Per IH: a ̸|= f1 e a ̸|= f2 → (unModel_Or) → a ̸|= Or f1 f2. ✓

Caso f = f1 ∧ f2:
  andb = false ⟺ almeno uno false.
  Se evTF f1 a = false: per IH → a ̸|= f1 → (unModel_And_l). ✓
  Se evTF f2 a = false: per IH → a ̸|= f2 → (unModel_And_r). ✓

Caso f = f1 → f2:
  orb(negb(evTF f1), evTF f2) = false
  ⟺ negb(evTF f1) = false e evTF f2 = false
  ⟺ evTF f1 = true e evTF f2 = false.
  Per IH: a |= f1 e a ̸|= f2 → (unModel_Imp). ✓`,
      },
      {
        range: "0.4.7–0.4.9",
        title: "a |= f ⟹ evTF f a = true (Completeness)",
        tag: "Completezza dell'interprete – direzione positiva",
        strategy: `METODO: si inverte la derivazione di |= e si calcola evTF.

Caso f = f1 ∨ f2, a |= Or f1 f2:
  Inversione: model_Or_l (a |= f1) o model_Or_r (a |= f2).
  Se model_Or_l: per IH → evTF f1 a = true
    ⟹ orb(true)(_) = true. ✓
  Se model_Or_r: per IH → evTF f2 a = true
    ⟹ orb(_)(true) = true. ✓

Caso f = f1 ∧ f2: model_And → entrambi |=.
  Per IH: entrambi true → andb(true)(true) = true. ✓

Caso f = f1 → f2: model_Imp_l o model_Imp_r.
  Se model_Imp_l: a ̸|= f1 → per IH(completezza ̸|=) → evTF f1 = false
    ⟹ negb(false) = true ⟹ orb(true)(_) = true. ✓
  Se model_Imp_r: a |= f2 → evTF f2 = true ⟹ orb(_)(true) = true. ✓`,
      },
      {
        range: "0.4.10–0.4.12",
        title: "a ̸|= f ⟹ evTF f a = false (Completeness negativa)",
        tag: "Completezza – direzione negativa",
        strategy: `METODO: si inverte unModel e si calcola evTF.

Caso f = f1 ∧ f2, a ̸|= And:
  unModel_And_l (a ̸|= f1) o unModel_And_r (a ̸|= f2).
  Se ̸|= f1: IH → evTF f1 = false ⟹ andb(false)(_) = false. ✓
  Se ̸|= f2: IH → evTF f2 = false ⟹ andb(_)(false) = false. ✓

Caso f = f1 ∨ f2, a ̸|= Or:
  unModel_Or → a ̸|= f1 e a ̸|= f2.
  IH: entrambi false ⟹ orb(false)(false) = false. ✓

Caso f = f1 → f2, a ̸|= Imp:
  unModel_Imp → a |= f1 e a ̸|= f2.
  Per IH (completeness +): evTF f1 = true.
  Per IH (completeness -): evTF f2 = false.
  ⟹ negb(true) = false ⟹ orb(false)(false) = false. ✓`,
      },
    ],
  },
  {
    id: "deduction",
    title: "0.5 Logical Consequence",
    color: "#f4a261",
    exercises: [
      {
        range: "0.5.1",
        title: "Deduction theorem: (Γ |= f) ⟹ (∀a, a |= Γ→f)",
        tag: "Teorema di deduzione – direzione →",
        strategy: `Prova: Supponi Γ |= f. Sia a un'assegnazione arbitraria.
  Vogliamo: a |= Γ → f.
  Caso 1: a |= Γ. Per definizione di Γ |= f, a |= f.
    Quindi (model_Imp_r): a |= Γ → f. ✓
  Caso 2: a ̸|= Γ. Per (14) [¬(a|=Γ) ⟹ a̸|=Γ]:
    (model_Imp_l): a |= Γ → f. ✓`,
      },
      {
        range: "0.5.2",
        title: "Deduction theorem: (∀a, a |= Γ→f) ⟹ (Γ |= f)",
        tag: "Teorema di deduzione – direzione ←",
        strategy: `Prova: Supponi ∀a, a |= Γ→f. Sia a tale che a |= Γ.
  Da ipotesi: a |= Γ → f.
  Inversione di model: model_Imp_l (a ̸|= Γ) o model_Imp_r (a |= f).
  Caso model_Imp_l: a ̸|= Γ. Ma abbiamo a |= Γ.
    Per (16): a ̸|= Γ ⟹ ¬(a |= Γ) → contraddizione. ✓
  Caso model_Imp_r: a |= f. Questo è esattamente ciò che vogliamo. ✓`,
      },
      {
        range: "0.5.3–0.5.5",
        title: "(a |= Γ→f) ⟺ (a |= ¬Γ ∨ f)",
        tag: "Equivalenza implicazione e disgiunzione",
        strategy: `Direzione (a |= Γ→f) ⟹ (a |= ¬Γ ∨ f):
  Inversione di a |= Imp Γ f:
  Caso model_Imp_l (a ̸|= Γ):
    (model_Not): a |= ¬Γ → (model_Or_l): a |= ¬Γ ∨ f. ✓
  Caso model_Imp_r (a |= f):
    (model_Or_r): a |= ¬Γ ∨ f. ✓

Direzione (a |= ¬Γ ∨ f) ⟹ (a |= Γ→f):
  Inversione di a |= Or (Not Γ) f:
  Caso model_Or_l (a |= ¬Γ):
    (model_Not) inverso: a ̸|= Γ → (model_Imp_l): a |= Γ→f. ✓
  Caso model_Or_r (a |= f):
    (model_Imp_r): a |= Γ→f. ✓`,
      },
      {
        range: "0.5.6–0.5.7",
        title: "(a ̸|= ¬(¬Γ∨f)) ⟺ (a ̸|= Γ∧¬f)",
        tag: "Equivalenza tra ̸|= e negazione della disgiunzione",
        strategy: `Direzione (a ̸|= ¬(¬Γ∨f)) ⟹ (a ̸|= Γ∧¬f):
  a ̸|= Not(Or(Not Γ)(f)):
    unModel_Not → a |= Or(Not Γ)(f) … ATTENZIONE: questo dà a |= ¬Γ∨f.
  
  In realtà: a ̸|= ¬(¬Γ∨f) significa unModel su Not(¬Γ∨f).
    unModel_Not → a |= ¬Γ∨f → model_Or_l (a |= ¬Γ) o model_Or_r (a |= f).
  
  Vogliamo a ̸|= Γ∧¬f:
    Se a |= ¬Γ → a ̸|= Γ → unModel_And_l: a ̸|= Γ∧¬f. ✓
    Se a |= f → a ̸|= ¬f → unModel_And_r: a ̸|= Γ∧¬f. ✓

Direzione (a ̸|= Γ∧¬f) ⟹ (a ̸|= ¬(¬Γ∨f)):
  a ̸|= And Γ (Not f): unModel_And_l (a ̸|= Γ) o unModel_And_r (a ̸|= ¬f).
  Se a ̸|= Γ → a |= ¬Γ → model_Or_l → a |= ¬Γ∨f → unModel_Not: a ̸|= ¬(¬Γ∨f). ✓
  Se a ̸|= ¬f → a |= f → model_Or_r → a |= ¬Γ∨f → unModel_Not. ✓`,
      },
    ],
  },
  {
    id: "impfree",
    title: "0.6 Implication-Free Normal Form",
    color: "#06d6a0",
    exercises: [
      {
        range: "0.6.1–0.6.2",
        title: "a |= f ⟹ a |= to_ImpFree(f), f = ∨ o ∧",
        tag: "Equisoddisfacibilità – direzione forward, casi semplici",
        strategy: `CHIAVE: to_ImpFree è trasparente su ∧ e ∨ (li mappa su se stessi).

Caso f = Or f1 f2:
  to_ImpFree(Or f1 f2) = Or(to_ImpFree f1)(to_ImpFree f2).
  a |= Or f1 f2: model_Or_l (a |= f1) o model_Or_r (a |= f2).
  Se model_Or_l: per IH → a |= to_ImpFree f1
    → model_Or_l → a |= Or(to_ImpFree f1)(to_ImpFree f2). ✓
  Se model_Or_r: simmetrico. ✓

Caso f = And f1 f2:
  to_ImpFree(And f1 f2) = And(to_ImpFree f1)(to_ImpFree f2).
  a |= And f1 f2 → a |= f1 e a |= f2.
  Per IH su entrambi → model_And → a |= to_ImpFree(And f1 f2). ✓`,
      },
      {
        range: "0.6.3",
        title: "Caso f = ¬g (usando (19))",
        tag: "Caso negazione – usa ipotesi ausiliaria",
        strategy: `to_ImpFree(Not g) = Not(to_ImpFree g).

Vogliamo: a |= Not g ⟹ a |= Not(to_ImpFree g).
  a |= Not g → (model_Not) → a ̸|= g.
  Da (18): a ̸|= g ⟹ ¬(a |= g).
  Da (19): ¬(a |= g) ⟹ ¬(a |= to_ImpFree g).
  Da (18) inverso: ¬(a |= to_ImpFree g) ⟹ a ̸|= to_ImpFree g.
  Da (model_Not): a |= Not(to_ImpFree g). ✓

ATTENZIONE: qui NON si usa IH diretta, ma la (19) che è fornita come ipotesi!`,
      },
      {
        range: "0.6.4–0.6.5",
        title: "a |= to_ImpFree(f) ⟹ a |= f (direzione backward)",
        tag: "Equisoddisfacibilità – direzione inversa",
        strategy: `Caso f = Or f1 f2 (simmetrico al 0.6.1 ma in senso inverso):
  a |= Or(to_ImpFree f1)(to_ImpFree f2):
  model_Or_l: a |= to_ImpFree f1 → IH → a |= f1 → model_Or_l su f. ✓
  model_Or_r: simmetrico. ✓

Caso f = And f1 f2:
  a |= And(to_ImpFree f1)(to_ImpFree f2) → entrambi soddisfatti.
  Per IH: a |= f1 e a |= f2 → model_And. ✓`,
      },
      {
        range: "0.6.6",
        title: "Caso f = ¬g (usando (21)) – backward",
        tag: "Negazione – direzione inversa con (21)",
        strategy: `to_ImpFree(Not g) = Not(to_ImpFree g).

Vogliamo: a |= Not(to_ImpFree g) ⟹ a |= Not g.
  a |= Not(to_ImpFree g) → (model_Not) → a ̸|= to_ImpFree g.
  Da (20): a ̸|= to_ImpFree g ⟹ ¬(a |= to_ImpFree g).
  Da (21): ¬(a |= to_ImpFree g) ⟹ ¬(a |= g).
  Da (20) inverso: ¬(a |= g) ⟹ a ̸|= g.
  Da (model_Not): a |= Not g. ✓`,
      },
    ],
  },
  {
    id: "nnf",
    title: "0.7 Negation Normal Form",
    color: "#fb8500",
    exercises: [
      {
        range: "0.7.1",
        title: "NevTF(toNnf f) = true ⟹ evTF f = true, f = And",
        tag: "Soundness NNF – caso And",
        strategy: `toNnf(And f1 f2) = And(toNnf f1)(toNnf f2).
NevTF(And(toNnf f1)(toNnf f2)) a = true
⟺ NevTF(toNnf f1) a = true e NevTF(toNnf f2) a = true.
Per IH su f1: evTF f1 a = true.
Per IH su f2: evTF f2 a = true.
⟹ andb(evTF f1 a)(evTF f2 a) = andb(true)(true) = true. ✓`,
      },
      {
        range: "0.7.2",
        title: "NevTF(toNnf f) = false ⟹ evTF f = false, f = Or",
        tag: "Soundness NNF – caso Or, direzione false",
        strategy: `toNnf(Or f1 f2) = Or(toNnf f1)(toNnf f2).
NevTF(Or ...) a = false
⟺ NevTF(toNnf f1) = false e NevTF(toNnf f2) = false.
Per IH: evTF f1 = false e evTF f2 = false.
⟹ orb(false)(false) = false. ✓`,
      },
      {
        range: "0.7.3",
        title: "evTF(Not(Not g)) = true ⟹ NevTF(toNnf(Not(Not g))) = true",
        tag: "Completeness NNF – doppia negazione",
        strategy: `toNnf(Not(Not g)) = toNnf(g).  [doppia negazione viene eliminata]

evTF(Not(Not g)) a = negb(negb(evTF g a)) = evTF g a.
Quindi evTF g a = true.

Usiamo l'ipotesi: "evTF g a = true ⟹ NevTF(toNnf g) a = true" [IH].
Dunque NevTF(toNnf g) a = true.
Ma toNnf(Not(Not g)) = toNnf(g), quindi NevTF(toNnf(Not(Not g))) a = true. ✓

NOTA: questa direzione usa l'ipotesi ausiliaria fornita nel testo.`,
      },
      {
        range: "0.7.4",
        title: "Rilevanza di Γ |= f ⟺ ∀a, a ̸|= Γ∧¬f",
        tag: "Domanda aperta – risposta completa",
        strategy: `RISPOSTA SUGGERITA (sufficiente per il massimo):

L'equivalenza Γ |= f ⟺ ∀a, a ̸|= Γ∧¬f è fondamentale perché riduce la verifica
di una conseguenza logica (proprietà semantica) a un problema di insoddisfacibilità
(SAT checking), che è decidibile e automatizzabile.

PASSAGGI INTERMEDI RILEVANTI:
1. Γ |= f ⟺ ∀a, a |= Γ → f           [Teorema di deduzione]
2. a |= Γ→f ⟺ a |= ¬Γ∨f               [Imp come disgiunzione]
3. ¬(a |= ¬Γ∨f) ⟺ a ̸|= ¬Γ∨f          [complementarietà di |= e ̸|=]
4. a ̸|= ¬Γ∨f ⟺ a ̸|= ¬(Γ∧¬f)          [De Morgan]
5. a ̸|= ¬(Γ∧¬f) ⟺ a |= Γ∧¬f           [def. di ̸|= su ¬]

Quindi: Γ |= f ⟺ NON esiste a con a |= Γ∧¬f.
Questo consente di usare un SAT solver su Γ∧¬f per verificare proprietà logiche.`,
      },
    ],
  },
  {
    id: "cnf",
    title: "0.8 CNF & Tseitin",
    color: "#d62828",
    exercises: [
      {
        range: "0.8.1–0.8.5",
        title: "Traduzione in CNF + Tseitin transform",
        tag: "Pipeline: formula → ImpFree → NNF → Tseitin CNF",
        strategy: `PIPELINE STANDARD (uguale per tutti gli esercizi):

STEP 1 – Forma implication-free:
  Sostituisci ogni f1→f2 con ¬f1∨f2.

STEP 2 – Negation Normal Form (NNF):
  Porta le negazioni verso le foglie:
  • ¬(f1∧f2) → ¬f1∨¬f2  (De Morgan)
  • ¬(f1∨f2) → ¬f1∧¬f2  (De Morgan)
  • ¬¬f → f

STEP 3 – Tseitin transform su f (in NNF):
  Per ogni sottoformula composita g, introduci variabile fresca z_g e aggiungi:
  • g = f1 ∧ f2:  (z_g ↔ f1∧f2) come clausole:
      (¬z_g ∨ z_{f1}) ∧ (¬z_g ∨ z_{f2}) ∧ (z_g ∨ ¬z_{f1} ∨ ¬z_{f2})
  • g = f1 ∨ f2:  (z_g ↔ f1∨f2):
      (¬z_g ∨ z_{f1} ∨ z_{f2}) ∧ (z_g ∨ ¬z_{f1}) ∧ (z_g ∨ ¬z_{f2})
  La variabile radice z_root deve essere vera: aggiungi la clausola (z_root).

STEP 4 – Trovare a e a':
  • a ̸|= f: scegli un'assegnazione che falsifica f (es. setta variabili critiche a false).
  • a' estende a: tieni le stesse variabili originali, assegna le variabili fresche
    in modo coerente con la struttura Tseitin (ogni z_g = valore della sottoformula g sotto a).`,
      },
    ],
  },
  {
    id: "resolution",
    title: "0.9 Resolution",
    color: "#9b2226",
    exercises: [
      {
        range: "0.9.1–0.9.5",
        title: "Refutazione di CNF con il sistema Resolution",
        tag: "Costruzione dell'albero di refutazione",
        strategy: `OBIETTIVO: derivare la clausola vuota [ ] dal CNF dato.

REGOLE:
  (Ax): se C ∈ Γ, allora Γ ⊢ C.
  (W):  da Γ ⊢ C, deduci Γ ⊢ ℓ::C (aggiunge letterale).
  (Res on x): da Γ ⊢ x::C1 e Γ ⊢ ¬x::C2, deduci Γ ⊢ C1++C2.

STRATEGIA per costruire la prova:
  1. Parti dalle clausole unitarie (singleton) con Ax.
  2. Usa W se devi aggiungere un letterale a una clausola esistente.
  3. Usa Res per eliminare x: scegli x tale che x::C1 e ¬x::C2 siano derivabili.
  4. Ripeti finché non ottieni [ ].

Es. CNF [[x,y],[¬x],[¬y]] (0.9.1):
  Γ ⊢ [¬x]         (Ax)
  Γ ⊢ [x,y]        (Ax)
  Γ ⊢ [y]          (Res on x: da [x,y] e [¬x])
  Γ ⊢ [¬y]         (Ax)
  Γ ⊢ []           (Res on y: da [y] e [¬y]) ✓`,
      },
      {
        range: "0.9.6–0.9.8",
        title: "Spiegazione delle regole del sistema Resolution",
        tag: "Domande aperte sulle regole",
        strategy: `REGOLA (Ax): "C ∈ Γ / Γ ⊢ C"
  Lettura: se la clausola C appartiene al CNF Γ, allora è derivabile da Γ.
  Esempio: Γ = [[x,y],[¬x]] ⊢ [x,y] per (Ax).

REGOLA (W): "Γ ⊢ C / Γ ⊢ ℓ::C"
  Lettura: da una clausola derivata C, si può debolmente estenderla aggiungendo
  un letterale ℓ. Equivale all'indebolimento logico C ⊆ ℓ::C.
  Esempio: da Γ ⊢ [y] si ottiene Γ ⊢ [z,y] per (W con ℓ=z).

REGOLA (Res on x): "Γ ⊢ x::C1  e  Γ ⊢ ¬x::C2 / Γ ⊢ C1++C2"
  Lettura: se si derivano due clausole contenenti rispettivamente x e ¬x, si può
  derivare la loro risolvente (unione senza x e ¬x). Corrisponde al modus ponens.
  Esempio: da [x,y] e [¬x,z] si ottiene [y,z].`,
      },
      {
        range: "0.9.9",
        title: "Rilevanza e proprietà del sistema Resolution",
        tag: "Domanda aperta – risposta completa",
        strategy: `RISPOSTA SUGGERITA:

RILEVANZA: Il sistema Resolution è un metodo di refutazione completo e corretto per
la logica proposizionale. Dato un CNF Γ, permette di decidere automaticamente
se Γ è insoddisfacibile derivando la clausola vuota [ ].
È alla base di molti SAT solver e dimostratori automatici di teoremi.

PROPRIETÀ FONDAMENTALE – Correttezza (Soundness):
  Γ ⊢_Res [ ] ⟹ Γ insoddisfacibile.
  Rilevanza: garantisce che ogni refutazione trovata è genuina (no falsi positivi).

PROPRIETÀ FONDAMENTALE – Completezza:
  Γ insoddisfacibile ⟹ Γ ⊢_Res [ ].
  Rilevanza: garantisce che se Γ è insoddisfacibile, la procedura lo troverà sempre.

Insieme, correttezza e completezza rendono Resolution una procedura di decisione
per l'insoddisfacibilità propositionale.`,
      },
      {
        range: "0.9.10–0.9.11",
        title: "Soundness: Γ ⊢ [] ⟹ Γ insoddisfacibile",
        tag: "Prova di soundness per casi Ax e W",
        strategy: `Caso ultimo passo = (Ax):
  Γ ⊢ [ ] per (Ax) ⟹ [ ] ∈ Γ.
  La clausola vuota è insoddisfacibile per definizione (nessun letterale da soddisfare).
  Quindi Γ contiene una clausola insoddisfacibile ⟹ Γ insoddisfacibile. ✓

Caso ultimo passo = (W):
  Γ ⊢ ℓ::[ ] = [ℓ] e poi Γ ⊢ [] via (W).
  ATTENZIONE: (W) aggiunge letterali, quindi per arrivare a [ ] via (W) si avrebbe
  Γ ⊢ [ ] solo se si parte già da [ ].
  Quindi il caso (W) si riduce: [ ] deve già essere derivata, la premessa è Γ ⊢ [ ],
  e (W) non può "creare" [ ] dal nulla (ℓ::C aggiunge, non toglie letterali).
  Si usa IH: la premessa Γ ⊢ C dimostra già l'insoddisfacibilità per IH, e (W) è valido.`,
      },
      {
        range: "0.9.12–0.9.13",
        title: "Γ_{x←true} ⊢ C ⟹ Γ ⊢ ¬x::C",
        tag: "Lemma di lifting: da semplificazione a derivazione originale",
        strategy: `Caso (Ax):
  Γ_{x←true} ⊢ C per (Ax) ⟹ C ∈ Γ_{x←true}.
  Tre sottocasi per come C compare in Γ_{x←true}:
  (a) C ∈ Γ (clausola non toccata): allora Γ ⊢ C per (Ax), poi (W): Γ ⊢ ¬x::C. ✓
  (b) C è ottenuta da C' ∈ Γ rimuovendo ¬x: allora C'= ¬x::C, quindi Γ ⊢ ¬x::C per (Ax). ✓
  (c) La clausola conteneva x ed è stata eliminata: non può dare una clausola C. ✓

Caso (W):
  Premessa: Γ_{x←true} ⊢ D e C = ℓ::D.
  Per IH: Γ ⊢ ¬x::D.
  Applicando (W) con ℓ: Γ ⊢ ℓ::(¬x::D) = Γ ⊢ ¬x::(ℓ::D) = Γ ⊢ ¬x::C. ✓`,
      },
      {
        range: "0.9.14–0.9.15",
        title: "Completeness: Γ insoddisfacibile ⟹ Γ ⊢ []",
        tag: "Prova di completezza per induzione sulle variabili",
        strategy: `Caso 0 variabili:
  Γ ha solo clausole su nessuna variabile → Γ può contenere solo [ ].
  Se Γ insoddisfacibile ⟹ [ ] ∈ Γ ⟹ Γ ⊢ [ ] per (Ax). ✓

Caso ≥1 variabili (osservazioni chiave per 0.9.15):
  1. Sia x una variabile in Γ. Consideriamo Γ_{x←true} e Γ_{x←false}.
  2. Entrambi hanno meno variabili di Γ.
  3. Se Γ è insoddisfacibile, allora ENTRAMBI Γ_{x←true} e Γ_{x←false} sono insoddisfacibili
     (se uno fosse soddisfacibile, anche Γ lo sarebbe con quell'assegnazione).
  4. Per IH: Γ_{x←true} ⊢ [ ] e Γ_{x←false} ⊢ [ ].
  5. Per il lemma di lifting:
     Γ ⊢ ¬x::[ ] = Γ ⊢ [¬x]
     Γ ⊢ x::[ ]  = Γ ⊢ [x]
  6. (Res on x): da [x] e [¬x] → Γ ⊢ [ ]. ✓`,
      },
    ],
  },
  {
    id: "sat",
    title: "0.10 Satisfiability at Work",
    color: "#3a86ff",
    exercises: [
      {
        range: "0.10.1–0.10.5",
        title: "Encoding di vincoli in CNF",
        tag: "Modellazione propositionale",
        strategy: `VARIABILI: una variabile booleana per ogni elemento (es. a, b, c, d, e per U={A,B,C,D,E}).

0.10.1 – Almeno uno tra A e B selezionato:
  Formula: a ∨ b   →  CNF: [[a, b]]

0.10.2 – Al più uno tra A e B:
  Non entrambi: ¬(a ∧ b) = ¬a ∨ ¬b  →  CNF: [[¬a, ¬b]]

0.10.3 – Esattamente uno tra A e B:
  (a ∨ b) ∧ (¬a ∨ ¬b)  →  CNF: [[a,b], [¬a,¬b]]

0.10.4 – C e D non entrambi selezionati:
  ¬(c ∧ d) = ¬c ∨ ¬d  →  CNF: [[¬c, ¬d]]

0.10.5 – A selezionato SE E selezionato (e→a):
  e→a = ¬e ∨ a  →  CNF: [[¬e, a]]

REGOLA GENERALE:
  • "almeno uno": clausola disgiuntiva
  • "al più uno": per k elementi, O(k²) clausole ¬xi ∨ ¬xj per ogni coppia i≠j
  • "esattamente uno": combinazione dei due
  • implicazione p→q: clausola [¬p, q]`,
      },
      {
        range: "0.10.6",
        title: "Esattamente 2 elementi su 3 selezionati",
        tag: "Encoding esatto con 3 variabili",
        strategy: `U = {A,B,C}, variabili a,b,c. Vogliamo esattamente 2 selezionati.

FORMULA: (a∧b∧¬c) ∨ (a∧¬b∧c) ∨ (¬a∧b∧c)

CNF equivalente (senza Tseitin):
  Almeno 2: ognuno è selezionato se gli altri due non lo sono (no).
  Approccio diretto con clausole:
  • (a ∨ b): almeno uno dei primi due  [se ¬a e ¬b, impossibile averne 2]
  • (a ∨ c): almeno uno tra a e c
  • (b ∨ c): almeno uno tra b e c
  • (¬a ∨ ¬b ∨ ¬c): non tutti e tre

  CNF: [[a,b], [a,c], [b,c], [¬a,¬b,¬c]]
  Verifica: questa formula è soddisfatta esattamente dalle assegnazioni con esattamente 2 veri.`,
      },
      {
        range: "0.10.7–0.10.9",
        title: "3-Coloring e AtMostOne_ladder",
        tag: "Domande aperte sulla struttura della formula",
        strategy: `VARIABILI: X_{v,i} = "nodo v ha colore i", S_{v,i} = "almeno uno tra colore 1..i è usato da v".

0.10.7 – ∧_{i=1}^{k} (¬X_{v,i} ∨ S_{v,i}):
  Scrittura esplicita per k=3:
    (¬X_{v,1} ∨ S_{v,1}) ∧ (¬X_{v,2} ∨ S_{v,2}) ∧ (¬X_{v,3} ∨ S_{v,3})
  Significato: se il nodo v ha il colore i, allora S_{v,i} è true.
  Ovvero: la variabile "prefisso" S_{v,i} viene attivata se X_{v,i} è vera.

0.10.8 – ∧_{i=2}^{k} (¬S_{v,i-1} ∨ S_{v,i}):
  Scrittura per k=3: (¬S_{v,1} ∨ S_{v,2}) ∧ (¬S_{v,2} ∨ S_{v,3})
  Significato: le S_{v,i} sono monotone crescenti (se S_{v,i-1} è vera, S_{v,i} lo è).

0.10.9 – ∧_{i=2}^{k} (¬S_{v,i-1} ∨ ¬X_{v,i}):
  Scrittura per k=3: (¬S_{v,1} ∨ ¬X_{v,2}) ∧ (¬S_{v,2} ∨ ¬X_{v,3})
  Significato: se S_{v,i-1} è già vera (un colore ≤ i-1 è già usato), allora X_{v,i}
  deve essere falsa. Assicura l'unicità del colore.`,
      },
      {
        range: "0.10.10–0.10.11",
        title: "Encoding S_{i,j}: almeno j veri tra p_1,...,p_i",
        tag: "Conteggio propositionale ricorsivo",
        strategy: `S_{i,j} = "almeno j tra p_1,...,p_i sono true".
Caratterizzazione ricorsiva: S_{i,j} ↔ (S_{i-1,j} ∨ (p_i ∧ S_{i-1,j-1})).

0.10.10 – Sub-formula ∧_{i=3}^{4} ∧_{j=2}^{2} (S_{i,j} ↔ ...):
  i=3, j=2: S_{3,2} ↔ (S_{2,2} ∨ (p_3 ∧ S_{2,1}))
  i=4, j=2: S_{4,2} ↔ (S_{3,2} ∨ (p_4 ∧ S_{3,1}))
  
  S_{4,2}: "almeno 2 tra p_1,p_2,p_3,p_4 sono true".

0.10.11 – Sub-formula ∧_{i=2}^{2} ∧_{j=1}^{1} (S_{i,j} ↔ ...):
  i=2, j=1: S_{2,1} ↔ (S_{1,1} ∨ (p_2 ∧ S_{1,0}))
  
  S_{2,1}: "almeno 1 tra p_1,p_2 è true".`,
      },
    ],
  },
  {
    id: "derivation",
    title: "0.11 Natural Deduction (NJ)",
    color: "#6a0572",
    exercises: [
      {
        range: "0.11.1",
        title: "⊢ (φ ∧ ψ) → φ",
        tag: "NJ: proiezione sinistra",
        strategy: `Strategia: introduci → con (→I), poi elimina ∧ con (∧E1).

Derivazione:
  ——————————————— (Ax)
  φ∧ψ ⊢ φ∧ψ
  ——————————————— (∧E1)
  φ∧ψ ⊢ φ
  ——————————————— (→I)
  ⊢ (φ∧ψ) → φ`,
      },
      {
        range: "0.11.2",
        title: "⊢ (φ ∧ ψ) → (ψ ∧ φ)",
        tag: "NJ: commutatività della congiunzione",
        strategy: `Derivazione:
  φ∧ψ ⊢ φ∧ψ [Ax]   φ∧ψ ⊢ φ∧ψ [Ax]
  ——————————[∧E2]   ——————————[∧E1]
  φ∧ψ ⊢ ψ           φ∧ψ ⊢ φ
  ————————————————————————————[∧I]
        φ∧ψ ⊢ ψ∧φ
        ——————————————[→I]
        ⊢ (φ∧ψ)→(ψ∧φ)`,
      },
      {
        range: "0.11.3",
        title: "⊢ (φ ∨ ψ) → (ψ ∨ φ)",
        tag: "NJ: commutatività della disgiunzione",
        strategy: `Serve (∨E) per ragionare per casi su φ∨ψ.

Derivazione:
  φ⊢φ [Ax]      ψ⊢ψ [Ax]
  ——————[∨I2]   ——————[∨I1]
  φ⊢ψ∨φ         ψ⊢ψ∨φ
  φ∨ψ⊢φ∨ψ [Ax]
  ————————————————————————[∨E]
      φ∨ψ ⊢ ψ∨φ
      ——————————[→I]
      ⊢ (φ∨ψ)→(ψ∨φ)`,
      },
      {
        range: "0.11.4",
        title: "⊢ (φ∧(ψ∧χ)) → ((φ∧ψ)∧χ)",
        tag: "NJ: associatività ∧",
        strategy: `Ctx: sia Δ = {φ∧(ψ∧χ)}.

  Δ⊢φ∧(ψ∧χ) [Ax] → Δ⊢φ [∧E1]
  Δ⊢φ∧(ψ∧χ) [Ax] → Δ⊢ψ∧χ [∧E2] → Δ⊢ψ [∧E1]
  ————————————————————————————————[∧I]
  Δ⊢φ∧ψ
  Δ⊢φ∧(ψ∧χ) [Ax] → Δ⊢ψ∧χ [∧E2] → Δ⊢χ [∧E2]
  ————————————————————————————————[∧I]
  Δ⊢(φ∧ψ)∧χ
  ———————————[→I]
  ⊢ (φ∧(ψ∧χ))→((φ∧ψ)∧χ)`,
      },
      {
        range: "0.11.5",
        title: "⊢ (φ∨(ψ∨χ)) → ((φ∨ψ)∨χ)",
        tag: "NJ: associatività ∨",
        strategy: `Serve ∨E annidata. Sia Δ = {φ∨(ψ∨χ)}.

  Caso φ: φ⊢φ [Ax] →[∨I1] φ⊢φ∨ψ →[∨I1] φ⊢(φ∨ψ)∨χ
  Caso ψ∨χ: ragiona per casi su ψ∨χ:
    Caso ψ: ψ⊢ψ [Ax] →[∨I2] ψ⊢φ∨ψ →[∨I1] ψ⊢(φ∨ψ)∨χ
    Caso χ: χ⊢χ [Ax] →[∨I2] χ⊢(φ∨ψ)∨χ
    [∨E su ψ∨χ]: ψ∨χ⊢(φ∨ψ)∨χ
  [∨E su φ∨(ψ∨χ)]: φ∨(ψ∨χ)⊢(φ∨ψ)∨χ
  [→I]: ⊢ (φ∨(ψ∨χ))→((φ∨ψ)∨χ)`,
      },
      {
        range: "0.11.6",
        title: "⊢ ¬(φ∨ψ) → (¬φ ∧ ¬ψ)",
        tag: "NJ: De Morgan (una direzione)",
        strategy: `Sia Δ = {¬(φ∨ψ)}.

Per dimostrare ¬φ: assumere φ, derivare ⊥.
  φ⊢φ [Ax] →[∨I1] φ⊢φ∨ψ
  Δ⊢¬(φ∨ψ) [Ax]
  ——————————————————[¬E]
  Δ,φ⊢⊥
  ——————[¬I]
  Δ⊢¬φ

Analogamente per ¬ψ (usa ∨I2 invece di ∨I1).

  Δ⊢¬φ   Δ⊢¬ψ
  ——————————————[∧I]
  Δ⊢¬φ∧¬ψ
  ——————————[→I]
  ⊢¬(φ∨ψ)→(¬φ∧¬ψ)`,
      },
      {
        range: "0.11.7",
        title: "⊢ (¬φ ∧ ¬ψ) → ¬(φ∨ψ)",
        tag: "NJ: De Morgan (direzione inversa)",
        strategy: `Sia Δ = {¬φ∧¬ψ}.
Per ¬(φ∨ψ): assumere φ∨ψ, derivare ⊥.

Δ⊢¬φ∧¬ψ [Ax] →[∧E1] Δ⊢¬φ
Δ⊢¬φ∧¬ψ [Ax] →[∧E2] Δ⊢¬ψ

Assumendo φ∨ψ, usa ∨E:
  Caso φ: Δ,φ⊢¬φ [W su Δ⊢¬φ]  Δ,φ⊢φ [Ax]  →[¬E] Δ,φ⊢⊥
  Caso ψ: Δ,ψ⊢¬ψ [W su Δ⊢¬ψ]  Δ,ψ⊢ψ [Ax]  →[¬E] Δ,ψ⊢⊥
  [∨E]: Δ,φ∨ψ⊢⊥
  [¬I]: Δ⊢¬(φ∨ψ)
  [→I]: ⊢ (¬φ∧¬ψ)→¬(φ∨ψ)`,
      },
    ],
  },
];

export default function LopiStudyGuide() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeExercise, setActiveExercise] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const chapter = chapters[activeChapter];
  const exercise = chapter.exercises[activeExercise];

  return (
<div style={{
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "#0f0f13",
    minHeight: "100vh",
    color: "#e8e0d0",
    display: "flex",
    flexDirection: "column",
  }}>
    {/* AGGIUNGI QUESTO BLOCCO QUI SOTTO */}
    <style>{`
      html, body {
        margin: 0;
        padding: 0;
        background-color: #0f0f13; /* Evita flash bianchi durante il caricamento */
        overflow-x: hidden;
      }
    `}</style>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        borderBottom: "2px solid #333",
        padding: "20px 28px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        <div style={{
          background: "#e63946",
          color: "white",
          fontFamily: "monospace",
          fontWeight: "bold",
          fontSize: 18,
          padding: "6px 14px",
          borderRadius: 4,
          letterSpacing: 2,
        }}>LOpI</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1 }}>
            Guida agli Esercizi d'Esame
          </div>
          <div style={{ fontSize: 12, color: "#888", fontFamily: "monospace", marginTop: 2 }}>
            Logica per l'Informatica · Università di Torino · Roversi 2026
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{
          width: 240,
          background: "#13131a",
          borderRight: "1px solid #222",
          padding: "12px 0",
          overflowY: "auto",
          flexShrink: 0,
        }}>
          {chapters.map((ch, ci) => (
            <div key={ch.id}>
              <button
                onClick={() => { setActiveChapter(ci); setActiveExercise(0); }}
                style={{
                  width: "100%",
                  background: activeChapter === ci ? ch.color + "22" : "transparent",
                  border: "none",
                  borderLeft: activeChapter === ci ? `3px solid ${ch.color}` : "3px solid transparent",
                  color: activeChapter === ci ? ch.color : "#aaa",
                  textAlign: "left",
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "monospace",
                  fontWeight: activeChapter === ci ? "bold" : "normal",
                  transition: "all 0.15s",
                }}
              >
                {ch.title}
              </button>
              {activeChapter === ci && ch.exercises.map((ex, ei) => (
                <button
                  key={ei}
                  onClick={() => setActiveExercise(ei)}
                  style={{
                    width: "100%",
                    background: activeExercise === ei ? ch.color + "15" : "transparent",
                    border: "none",
                    borderLeft: activeExercise === ei ? `2px solid ${ch.color}88` : "2px solid transparent",
                    color: activeExercise === ei ? "#ddd" : "#666",
                    textAlign: "left",
                    padding: "7px 24px",
                    cursor: "pointer",
                    fontSize: 11,
                    fontFamily: "monospace",
                    transition: "all 0.15s",
                  }}
                >
                  {ex.range}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "28px 36px", overflowY: "auto" }}>
          {/* Chapter title */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: chapter.color,
              flexShrink: 0,
            }} />
            <h1 style={{
              margin: 0,
              fontSize: 22,
              color: chapter.color,
              fontFamily: "monospace",
              letterSpacing: 1,
            }}>{chapter.title}</h1>
          </div>

          {/* Exercise tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {chapter.exercises.map((ex, ei) => (
              <button
                key={ei}
                onClick={() => setActiveExercise(ei)}
                style={{
                  background: activeExercise === ei ? chapter.color : "#1e1e2a",
                  border: `1px solid ${activeExercise === ei ? chapter.color : "#333"}`,
                  color: activeExercise === ei ? "white" : "#888",
                  padding: "6px 14px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "monospace",
                  fontWeight: activeExercise === ei ? "bold" : "normal",
                }}
              >
                {ex.range}
              </button>
            ))}
          </div>

          {/* Exercise card */}
          <div style={{
            background: "#1a1a24",
            border: `1px solid ${chapter.color}44`,
            borderRadius: 8,
            overflow: "hidden",
          }}>
            {/* Card header */}
            <div style={{
              background: chapter.color + "18",
              borderBottom: `1px solid ${chapter.color}33`,
              padding: "16px 24px",
            }}>
              <div style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: chapter.color,
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 6,
              }}>{exercise.tag}</div>
              <div style={{ fontSize: 17, fontWeight: "bold", color: "#f0e8d8" }}>
                {exercise.title}
              </div>
              <div style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#666",
                marginTop: 4,
              }}>
                Esercizi {exercise.range}
              </div>
            </div>

            {/* Strategy */}
            <div style={{ padding: "20px 24px" }}>
              <div style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 12,
              }}>Strategia / Soluzione</div>
              <pre style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                fontFamily: "'Courier New', monospace",
                fontSize: 13,
                lineHeight: 1.8,
                color: "#d4cfc5",
                background: "#12121a",
                padding: "16px 20px",
                borderRadius: 6,
                border: "1px solid #2a2a38",
              }}>
                {exercise.strategy}
              </pre>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            <button
              onClick={() => {
                if (activeExercise > 0) setActiveExercise(activeExercise - 1);
                else if (activeChapter > 0) {
                  setActiveChapter(activeChapter - 1);
                  setActiveExercise(chapters[activeChapter - 1].exercises.length - 1);
                }
              }}
              style={{
                background: "#1e1e2a",
                border: "1px solid #333",
                color: "#aaa",
                padding: "8px 18px",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 12,
              }}
            >← Precedente</button>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "#444", alignSelf: "center" }}>
              Cap. {activeChapter + 1}/{chapters.length} · Es. {activeExercise + 1}/{chapter.exercises.length}
            </span>
            <button
              onClick={() => {
                if (activeExercise < chapter.exercises.length - 1) setActiveExercise(activeExercise + 1);
                else if (activeChapter < chapters.length - 1) {
                  setActiveChapter(activeChapter + 1);
                  setActiveExercise(0);
                }
              }}
              style={{
                background: chapter.color,
                border: "none",
                color: "white",
                padding: "8px 18px",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >Successivo →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
