import React from 'react'
import ReindeerIcon from './ReindeerIcon'

describe('<ReindeerIcon />', () => {
  it('renders the ReindeerIcon component correctly', () => {
    cy.mount(<ReindeerIcon />)

    cy.get('.animate-bounce').should('exist');
    cy.get('.text-6xl').should('have.text', '🦌');
    cy.get('.relative').should('exist');
    cy.get('.text-3xl').should('have.text', '🎁');
    cy.get('.text-5xl').should('have.text', '🛷');
  });
})