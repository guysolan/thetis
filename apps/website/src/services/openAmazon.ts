let toUS = ['United States', 'Canada', 'Mexico']

export const openAmazon = async () => {
    fetch('https://extreme-ip-lookup.com/json/?key=mRicTdUafjFRd3Ufqftq')
        .then((res) => res?.json())
        .then((response) => {
            if (toUS.includes(response?.country)) {
                window.open(
                    'https://www.amazon.com/dp/B09N5MVY1Q',
                    '_blank',
                    'noreferrer'
                )
            } else {
                // return 'https://www.amazon.co.uk/dp/B09N5MVY1Q'
                window.open(
                    'https://www.brace-yourself.co.uk/foot-and-ankle-c7/thetis-medical-achilles-tendon-rupture-night-splint-p82',
                    '_blank',
                    'noreferrer'
                )
            }
        })
}
