export const COLORS = {
    app_violete: "#8800FF",
    app_violete_opacity: (val) => `rgb(136, 0, 255,${val})`,
    WHITE: '#FFFFFF',
    WHITE_OPACITY: (val) => `rgba(255, 255, 255, ${val})`,
    BLACK: '#000000',
    BLACK_OPACITY: (val) => `rgba(0, 0, 0, ${val})`,
    GREY: 'grey',
    GREY_OPACITY: (val) => `rgba(128, 128, 128, ${val})`, // assuming standard grey
    LIGHT_GREY: 'lightgrey',
    LIGHT_GREY_OPACITY: (val) => `rgba(211, 211, 211, ${val})`, // assuming standard lightgrey
    cyan: `rgba(6, 246, 239, 1) `,
    cyanOpacity: (val) => `rgba(6, 246, 239, ${val})`
}