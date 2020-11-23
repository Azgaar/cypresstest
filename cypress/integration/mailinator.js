const {url, recipient, subject, body} = require('../fixtures/mailinator.json') // load test data

describe('Mailinator email body extractor', () => {
  beforeEach(() => {
    // open homepage
    // can be omitted if we allowed to use search parameters (visit ./index.jsp?query={recipient})
    cy.visit(url)
  })

  it('Opens recipient mailbox, locates email and logs email body to console', () => {
    // get elements by id, no better stable selectors
    cy.get('#addOverlay').type(recipient)
    cy.get('#go-to-public').click()

    // verify url contains mailbox
    cy.url().should('include', recipient)

    // find and click element containg subject as text
    cy.get('#inboxpane').contains(subject).click()

    // verify url contains 'msgpane'
    cy.url().should('include', 'msgpane')

    // wait for iframe load, custom command in index.js, not supported by cypress by default
    cy.frameLoaded('iframe#msg_body')
    cy.get('iframe#msg_body').then(function($iframe) {
      const $emailBody = $iframe.contents().find('body') // this is jQuery in cypress
      const text = $emailBody.text()

      // log text to dev and Cypress console
      console.log(text)
      cy.log(text)

      // assert text is equal to body of sent email
      expect(text).to.equal(body)
    })
  })
})
