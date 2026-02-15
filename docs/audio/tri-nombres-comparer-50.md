# Scripts Audio — Tri des Nombres "Comparer à 50"

> **Exercice** : Chapitre 1002, Étape 2 — Comparer des nombres à 50
> **Objectif pédagogique** : Comparer et ordonner avec < et > (Programme CE1, L.22)

## Instruction Principale — Phase Challenge

**Audio** : `tri-nombres-comparer-50-instruction.mp3`
**Durée cible** : ~4 secondes
**Débit** : 120-140 mots/min
**Voix** : Claire, pédagogique, rassurante

```
Le nombre est-il plus petit que 50 ? Ou bien 50 et plus ?
```

**Notes de production** :
- Ton interrogatif sur "plus petit que 50 ?"
- Pause de 0.8s après la première question
- Ton neutre sur "Ou bien 50 et plus ?"
- Emphase légère sur "50" (repère clé)

---

## Feedback Correct — Phase Resolution

**Audio** : `tri-nombres-comparer-50-correct.mp3`
**Durée cible** : ~2 secondes
**Débit** : 120-140 mots/min
**Voix** : Encourageante, joyeuse

```
Bravo ! Tu sais bien comparer les nombres !
```

**Notes de production** :
- Ton ascendant sur "Bravo !"
- Sourire audible dans la voix
- Accompagné d'un effet sonore positif (carillon léger, ~200-400ms)

---

## Feedback Erreur — Catégorie "Plus petits que 50"

**Audio** : `tri-nombres-comparer-50-erreur-petit.mp3`
**Durée cible** : ~4 secondes
**Débit** : 120-140 mots/min
**Voix** : Douce, bienveillante, encourageante

```
Ce nombre est plus petit que 50. Regarde bien ! On réessaie ?
```

**Notes de production** :
- **AUCUN ton de déception** (principe anti-frustration Plumi)
- Ton neutre et factuel sur "plus petit que 50"
- Pause de 0.8s après "Regarde bien !"
- Ton encourageant sur "On réessaie ?" (montée légère)
- Accompagné d'un son doux et neutre (~200-300ms)

---

## Feedback Erreur — Catégorie "50 et plus"

**Audio** : `tri-nombres-comparer-50-erreur-grand.mp3`
**Durée cible** : ~4 secondes
**Débit** : 120-140 mots/min
**Voix** : Douce, bienveillante, encourageante

```
Ce nombre est 50 ou plus grand. Regarde bien ! On réessaie ?
```

**Notes de production** :
- Même tonalité douce et encourageante
- Ton neutre et factuel sur "50 ou plus grand"
- Pause de 0.8s après "Regarde bien !"
- Ton encourageant sur "On réessaie ?"

---

## Principes Généraux [AUDIO] [PEDA]

1. **Débit adapté CE1** : 120-140 mots/min
2. **Pauses respiratoires** : 0.8-1.2s entre phrases
3. **Zéro son négatif** : Pas de buzzer, pas de ton déçu
4. **Toujours encourageant** : Même en cas d'erreur
5. **Audio + Texte** : L'app reste fonctionnelle sans son

---

## Implémentation Frontend (Future)

**Fichiers audio à placer dans** : `apps/frontend/public/audio/`

```
audio/
  tri-nombres-comparer-50-instruction.mp3
  tri-nombres-comparer-50-correct.mp3
  tri-nombres-comparer-50-erreur-petit.mp3
  tri-nombres-comparer-50-erreur-grand.mp3
```

**Format** : MP3 64kbps mono (voix)
**Pre-fetch** : Télécharger tous les audios avant le début du chapitre
**Latence cible** : < 200ms entre action et retour sonore

---

## Validation [PEDA]

✅ Vocabulaire accessible CE1 (6-7 ans)
✅ Compétence CE1 officielle : "Comparer et ordonner avec <, >" (Programme L.22)
✅ Concept clair : comparaison de nombres entiers
✅ Repère visuel : 50 est au milieu de [0, 100]
✅ Feedback encourageant (zéro frustration)
