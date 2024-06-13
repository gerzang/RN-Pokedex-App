

import { useContext } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';


interface Props {
    style?: StyleProp<ImageStyle>
}

const PokeballBg = ({ style }: Props) => {

    const { isDark } = useContext(ThemeContext);
    const pokeBallImg = isDark
        ? require('../../../assets/images/pokeball-light.png')
        : require('../../../assets/images/pokeball-dark.png')



    return (
        <Image
            source={pokeBallImg}
            style={[
                {
                    width: 300,
                    height: 300,
                    opacity: 0.3
                },
                style
            ]}
        />
    )
}

export default PokeballBg;
