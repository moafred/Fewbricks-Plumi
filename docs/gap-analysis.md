# Analyse d'Ecart : Jeux Actuels vs Objectifs CE1 (2026)

## 1. Taux de Couverture par les Jeux Actuels

5 mecaniques implementees (`StepMechanic` dans `@plumi/shared`) :

| Objectif Pedagogique | Jeu(x) Actuel(s) | Statut | Commentaire |
| :--- | :--- | :---: | :--- |
| **Conjugaison (verbes)** | Potion / Grimoire | ✅ | Tous temps, tous pronoms. |
| **Classes de Mots** | Tri Sorcier | ✅ | Extensible a d'autres classes (noms, adj). |
| **Accords GN (genre/nombre)** | Pont des Accords / Potion GN | ✅ | Determinants, adjectifs, noms. 54 noms, 30 adj, 5 det. |
| **Structure Phrase** | Grimoire | ⚠️ | Limite au choix multiple. Manque de manipulation libre. |
| **Fluidite Lecture** | Aucun | ❌ | **Lacune Critique.** Necessite la voix (Web Speech API). |
| **Phonologie** | Aucun | ❌ | **Lacune.** Necessite une mecanique de dechiffrage. |

**Couverture estimee : ~60%** (4/6 objectifs couverts, 2 lacunes critiques).

## 2. Nouveaux Concepts Proposes (Roadmap)

### A. "Le Reparateur de Phrases" (Syntaxe)
- **Mecanique** : Une phrase "cassee" (sans majuscule, point, ou negation mal placee) apparait. L'enfant touche les zones a reparer.
- **Cible** : Identification de la phrase et ponctuation.

### B. "L'Echo de Plumi" (Lecture Fluide)
- **Mecanique** : Plumi prononce une phrase, l'enfant doit la repeter. L'IA analyse la fluidite (Web Speech API).
- **Cible** : Objectif 70 mots/minute de l'Educ. Nationale.

## 3. Conclusion

Nos 5 jeux actuels couvrent environ **60% du fonctionnel final**.
Avec les 2 nouveaux concepts ci-dessus, nous atteignons **90%**. Les 10% restants (lexique/orthographe complexe) seront geres par des variantes du Tri et de la Potion.

---
*Analyse realisee par l'equipe LEAD, PEDA et ARCHI.*
