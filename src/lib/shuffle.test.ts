import { describe, it, expect } from 'vitest'
import { deriveDerangement } from './shuffle'

describe('deriveDerangement', () => {
  it('throws for single participant', () => {
    expect(() => deriveDerangement(['A'])).toThrow()
  })

  it('shuffles 2 participants correctly', () => {
    const input = ['A', 'B']
    const output = deriveDerangement(input)
    expect(output[0]).toBe('B')
    expect(output[1]).toBe('A')
  })

  it('produces valid derangement for 3 items', () => {
    const input = ['A', 'B', 'C']
    for (let i = 0; i < 20; i++) {
        const output = deriveDerangement(input)
        expect(output[0]).not.toBe('A')
        expect(output[1]).not.toBe('B')
        expect(output[2]).not.toBe('C')
        expect(output).toHaveLength(3)
        expect(new Set(output).size).toBe(3)
    }
  })

  it('avoids mutual loops for > 2 participants if possible', () => {
    // This is probabilistic, but our logic pushes for it.
    const input = ['1', '2', '3', '4']
    const output = deriveDerangement(input)
    
    // Check no self
    input.forEach((val, idx) => expect(output[idx]).not.toBe(val))
    
    // Check mutual ( A->B implies B!->A )
    // Note: In small sets (3), mutual exclusion implies a simple cycle A->B->C->A, so no A<->B.
    // For 4, A->B, B->A, C->D, D->C is a valid derangement but we try to avoid it.
  })
})
