import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { colors } from 'uPortMobile/lib/styles/globalStyles'

import Menu from 'uPortMobile/lib/components/shared/Menu'
import MenuItem from 'uPortMobile/lib/components/shared/MenuItem'
import Icon from 'react-native-vector-icons/Ionicons'

import { connections } from 'uPortMobile/lib/selectors/identities'
import { hdRootAddress, seedConfirmedSelector } from 'uPortMobile/lib/selectors/hdWallet'

const Chevron = () => <Icon name={Platform.OS === 'ios' ? 'ios-arrow-forward-outline' : 'md-arrow-forward'} color={colors.grey216} style={{marginLeft: 16}} size={20} />

class Settings extends React.Component {

    static navigatorStyle = {
        largeTitle: true,
        navBarNoBorder: false,
        drawUnderNavBar: true,
        navBarTransparent: false,
        navBarTranslucent: false,
        navBarBackgroundColor: colors.brand,
        navBarButtonColor: colors.white,
        navBarTextColor: colors.white,
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Menu>  
                    <MenuItem title='About' destination='settings.main' navigator={this.props.navigator} topBorder />
                    <MenuItem title='Advanced' destination='uport.advanced' navigator={this.props.navigator} />
                        {
                            this.props.hasHDWallet && 
                            <MenuItem title='Account Recovery'
                                danger={!this.props.seedConfirmed}
                                value={this.props.seedConfirmed ? undefined : 'Account At Risk'}
                                destination='backup.seedInstructions'
                                navigator={this.props.navigator}
                            />
                        }
                        {   
                            this.props.hasHDWallet && 
                            <MenuItem
                                title='Account Back Up'
                                destination='backup.dataInstructions'
                                navigator={this.props.navigator}
                            />
                        }
                    <MenuItem title='Try uPort' navigator={this.props.navigator} destination='advanced.try-uport' last />
                </Menu>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEAEA'
    }
})

const mapStateToProps = (state) => {
    return {
      connections: connections(state) || [],
      hasHDWallet: !!hdRootAddress(state),
      seedConfirmed: seedConfirmedSelector(state)
    }
  }
  export default connect(mapStateToProps)(Settings)