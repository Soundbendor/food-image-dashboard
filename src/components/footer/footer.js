import React from 'react'
import Footer from './index'
//import Icon from './components/icons'

export function FooterContainer() {
    return (
        <Footer>
            <Footer.Wrapper>
            <Footer.Row>
                <Footer.Column>
                <Footer.Title>About Us</Footer.Title>
                    <Footer.Link href="#">The Team</Footer.Link>
                    <Footer.Link href="#">Oregon State University</Footer.Link>
                    <Footer.Link href="#">soundbendor</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Services</Footer.Title>
                    <Footer.Link href="#">Marketing</Footer.Link>
                    <Footer.Link href="#">Consulting</Footer.Link>
                    <Footer.Link href="#">Development</Footer.Link>
                    <Footer.Link href="#">Design</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                <Footer.Title>Contact Us</Footer.Title>
                    <Footer.Link href="#">Email</Footer.Link>
                </Footer.Column>

            </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}