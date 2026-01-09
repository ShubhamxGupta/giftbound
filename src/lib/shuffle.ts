export function deriveDerangement(ids: string[]): string[] {
  if (ids.length < 2) throw new Error('Need at least 2 items to shuffle')
  
  let shuffled = [...ids]
  let valid = false
  let attempts = 0
  
  while (!valid && attempts < 100) {
    // Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Check Derangement (no index i s.t. shuffled[i] == ids[i])
    const noSelf = ids.every((id, i) => id !== shuffled[i])

    // Check Mutual Assignment (A -> B AND B -> A)
    // We want to minimize small loops if possible, but mainly A <-> B in small groups is boring.
    let noMutual = true
    if (ids.length > 2) {
      const assignmentMap = new Map()
      ids.forEach((id, idx) => assignmentMap.set(id, shuffled[idx]))
      
      for (const [giver, receiver] of assignmentMap) {
        if (assignmentMap.get(receiver) === giver) {
          noMutual = false
          break
        }
      }
    }

    valid = noSelf && noMutual
    attempts++
  }

  if (!valid) {
    // Fallback: Rotate by 1 (guaranteed derangement)
    shuffled = [...ids.slice(1), ids[0]]
  }
  
  return shuffled
}
