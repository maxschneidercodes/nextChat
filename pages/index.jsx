import StartingPageContent from '../components/starting-page/starting-page';

export default function HomePage(props) {
    return <StartingPageContent />;
}

export async function getStaticProps(context) {

    return {
        props: {
            user: []
        }
    }
}