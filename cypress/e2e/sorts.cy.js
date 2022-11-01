
describe('testing page', function () {
  it('page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Reset')
    cy.contains('Bubble sort')
    cy.contains('Selection sort')
    cy.contains('Merge sort')
    cy.contains('Quick sort')
  })

  it('bubble sort works', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Bubble sort').click()
  })

  it('selection sort works', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Selection sort').click()
  })

  it('merge sort works', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Merge sort').click()
    cy.contains('Sorted')
  })

  it('quick sort works', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Quick sort').click()
    cy.contains('Sorted')
  })
})
