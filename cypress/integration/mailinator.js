// load fixture
const {url, recipient, subject, body} = require('../fixtures/mailinator.json')

describe('Mailinator email body extractor', () => {
  beforeEach(() => {
    // open homepage
    // can be omitted if we allowed to use search parameters (visit ./index.jsp?query={recipient})
    cy.visit(url)
  })

  it('Opens recipient mailbox, locates email and logs email body to console', () => {
    // following best practices, get elements by attribute that's unlikely to be changed
    cy.get('header #addOverlay').type(recipient)
    cy.get('header #go-to-public').click()

    // verify url contains mailbox
    cy.url().should('include', recipient)

    // find and click element containg subject as text
    cy.get('#inboxpane').contains(subject).click()

    // verify url contains 'msgpane'
    cy.url().should('include', 'msgpane')

    // email body is in iframe, which is not fully supported by Cypress
    // wait for contentDocument load and ONLY then query for body div
    // see https://github.com/cypress-io/cypress/issues/136
    cy.get('iframe#msg_body').wait(2000).then(function($iframe) {
      const $emailBody = $iframe.contents().find('body') // this is jQuery in cypress

      // get DOM element from jQuery and take text
      const text = $emailBody[0].innerText?.trim()

      // log text to dev and Cypress console
      console.log(text)
      cy.log(text)

      // asset text is equal to body of sent email
      expect(text).to.equal(body)
    })
  })
})
