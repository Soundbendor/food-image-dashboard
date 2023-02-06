import React from 'react'
import Footer from './index'

export function FooterContainer() {
    return (
        <Footer>
            <Footer.Wrapper>
            <Footer.Row>
                <Footer.Column>
                <Footer.Title>About Us</Footer.Title>
                    <Footer.Link href="#">The Team</Footer.Link>
                    <Footer.Link href="https://engineering.oregonstate.edu/EECS/alumni-industry/student-engagement/Capstone">Oregon State University</Footer.Link>
                    <Footer.Link href="https://soundbendor.org/">soundbendor</Footer.Link>
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