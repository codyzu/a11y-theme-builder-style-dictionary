/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under Apache-2.0 License. See License.txt in the project root for license information
 */
import { createTheme } from "@mui/material/styles";
import { formLabelClasses } from "@mui/material";
import './Theme.css'
import './TB.css'

export const getCssValue = (prop) => {
    //console.log(`ENTER - getCssValue(${prop})`);
    let v = document.documentElement.style.getPropertyValue(prop);
    if (!v) {
        if (!rootStyleSheet) {
            rootStyleSheet = getStyleSheet(":root");
        }
        v = rootStyleSheet.style.getPropertyValue(prop);
    }
    if (typeof v == "string") {
        v = v.trim();
        if (v.indexOf("var(") > -1) {
            v = v.replace(/var\(([a-zA-Z0-9\-]+)\)/g, function(m, p1) {
                const val = getCssValue(p1)
                return val;
            });
        }
    }
    console.log(`getCssValue(${prop}) = ${v}`)
    return v;
}

export const setCssValues = (props) => {
    console.log(`setCssValues(${JSON.stringify(props)})`)
    for (const [prop, value] of Object.entries(props)) {
        setCssValue(prop, value);
    }
}

export const setCssValue = (prop, value) => {
    console.log(`setCssValue(${prop}, ${value})`);
    if (value === "TODO") return;
    if (!rootStyleSheet) {
        rootStyleSheet = getStyleSheet(":root");
    }
    rootStyleSheet.style.setProperty(prop, value);
}

let rootStyleSheet = null;

export const getStyleSheet = (selector) => {
    console.log(`getStyleSheet(${selector})`);
    for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        var rules = sheet.cssRules ? sheet.cssRules : sheet.rules;
        for (var j = 0; j < rules.length; j++) {
            if (rules[j].selectorText && rules[j].selectorText.toLowerCase() === selector) {
                return rules[j];
            }
        }
    }
};

const getStyleValue = (selector, prop) => {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var sheet = document.styleSheets[i];
        var rules = sheet.cssRules ? sheet.cssRules : sheet.rules;
        for (var j = 0; j < rules.length; j++) {
            if (rules[j].selectorText && rules[j].selectorText.toLowerCase() === selector) {
                //console.log("rules=", rules[j]);
                var value = rules[j].style.getPropertyValue(prop).trim();
                // NOTE: could use setPropertyValue(prop, newValue) instead of setting :root on document
                console.log(`getStyleRuleValue ${selector} ${prop} = ${value}`);
                return value;
            }
        }
    }
};

export const themes = {};

try {
    const lightTheme = createTheme({
        // Can't change these, since css doesn't seem to be defined at this point
         palette: {
            primary: {
                main: getCssValue("--primary"),
            },
            // secondary: {
            //     main: "calc(var(--color)))",
            // },
            text: {
                fontFamily: getCssValue("--primaryFont"),
                color: "var(--on-background)",
                // primary: getCssValue("--primary"),
                // secondary: getCssValue("--secondary"),
                // disabled: getCssValue("--textDark"),
            },
            //divider: "",
            background: {
                default: getCssValue("--background-color"),
            },
            error: {
                main: getCssValue("--danger"),
            },
            warning: {
                main: getCssValue("--warning"),
            },
            success: {
                main: getCssValue("--success"),
            },
            info: {
                main: getCssValue("--info"),
            },
            action: {
                // active: "",
                // hover: "",
                // hoverOpacity: "",
                // selected: "",
                // selectedOpacity: "",
                // disabled: "",
                // disabledBackground: "",
                // focus: "",
                // focusOpacity: "",
                // activatedOpacity: "",
            },
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            MuiButtonGroup: {
                defaultProps: {
                    disableRipple: true,
                },
            },
            // Style all react components using css root vars
            MuiButton: {
                defaultProps: {
                    variant: "contained"
                },
                styleOverrides: {
                    root: ({ ownerState }) => ({
                        ...(ownerState.variant === 'contained' && {
                                color: "var(--background-on-button)",
                                background: "var(--background-button)",
                            }),
                        ...(ownerState.variant === 'text' && {
                                color: "var(--background-hotlink)",
                                background: "var(--background-color)"
                            }),
                        ...(ownerState.variant === 'outlined' && {
                                color: "var(--background-button) !important",
                                background: "none !important",
                            }),
                        borderRadius: "var(--button-radius))",
                        boxShadow: "var(--background-shadow)",
                        font: "var(--background-buttonTypography)",
                        letterSpacing: "var(--background-button-letter-spacing)",
                        minHeight: "max(var(--sizing-min-target), calc(var(--button-height)  * var(--sizing-1)) !important",
                        minWidth: "var(--button-min-width)",
                        marginTop: "var(--spacing-half)",
                        /*
                        paddingLeft: "var(--spacing-3)", // var(--background-button-padding) // this is too small & not in px
                        paddingRight: "var(--spacing-3)",
                        */
                       padding: "0 calc(var(--button-padding) * var(--sizing-1))",
                       textDecoration: "var(--button-text-decoration)",
                       textTransform: "var(--button-)",
                        // ":hover": {
                        //     background: "var(--background-on-button)",
                        //     color: "var(--background-button)",
                        // },
                    }),
                }
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        "& .inline-icon": {
                          height: "var(--spacing-2)",
                          width: "var(--spacing-2)",
                          justifyContent: "center",
                          display: "flex",
                        }
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        //fontFamily: "Ariel", //"var(--fontFamily)",
                        border: "1px solid var(--border)",
                        borderRadius: "calc(var(--radius-1) * var(--card-radius))",
                        padding: "calc(var(--spacing-1) * var(--card-padding))",
                        gap: "calc(var(--spacing-1) * var(--card-gap))",
                        boxShadow: "var(--card-shadow)",
                        background: "var(--background)",
                        color: "var(--on-background)",
                        minHeight: "var(--spacing-3)",
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "240px",
                    }
                }
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        padding: "0 calc(var(--sizing-min-target) + var(--spacing-1))",
                        margin: "var(--spacing-half) 0",
                        height: "var(--sizing-min-target)",
                        width: "var(--sizing-min-target)",
                        padding: 0,
                        "&.MuiCheckbox-root": {
                            backgroundColor: "var(--input)",
                            color: "var(--on-background)",
                        },
                        "&.Mui-checked": {
                            color: "var(--background-button) !important",
                        },
                    }
                }
            },
            MuiDivider: {
                styleOverrides: {
                    root: {
                        borderColor: "var(--on-background)",
                        opacity: ".6",
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        marginTop: "2px",
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                      root: {
                        borderRadius: "var(--spacing-1)",
                        minHeight: "calc(var(--spacing-1) * var(--button-height))",
                        padding: "0",
                        border: "1px solid var(--borrder)",
                        "& input": {
                            padding: "0 var(--spacing-2)",
                        },
                        "&.dropdownFocus": {
                          borderRadius: "var(--spacing-1)",
                          "&.Mui-focused fieldset": {
                            border: '1px auto var(--background-button)',
                            boxShadow: '0 0 var(--focusBlur) 1px var(--background-button-half)',
                          },
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: '1px solid var(--background-button)',
                            boxShadow: '0 0 var(--focusBlur) 1px var(--background-button-half)',
                        },
                        "& fieldset": {
                          border: '1px solid var(--border)',
                          borderRadius: "var(--spacing-1)",
                          borderColor: "var(--border)",
                          boxShadow: "none",
                        //   background: "var(--surface)",
                        //  color: "var(--on-surface)",
                        },
                        ".info &": {
                            color: "var(--on-info)",
                            backgroundColor: "var(--info)",
                        },
                        ".success &": {
                            color: "var(--on-success)",
                            backgroundColor: "var(--success)",
                        },
                        ".warning &": {
                            color: "var(--on-warning)",
                            backgroundColor: "var(--warning)",
                        },
                        ".danger &": {
                            color: "var(--on-danger)",
                            backgroundColor: "var(--danger)",
                        },
                    }
                }
            },
            MuiSelect: {
                defaultProps: {
                    MenuProps: {
                        PaperProps: {
                            sx: {
                                '& .MuiList-root.MuiMenu-list': {
                                    WebkitBoxShadow: "var(--elevation-3) !important",
                                    MozBoxShadow: "var(--elevation-3) !important",
                                    borderRadius: "var(--spacing-half)",
                                    marginLeft: "0",
                                },
                                '& .MuiList-root.MuiMenu-list .MuiMenuItem-root': {
                                    color: "var(--on-background)",
                                    minHeight: "var(--sizing-min-target)",
                                    display: "flex",
                                    gap: "var(--spacing-1)",
                                    opacity: "var(--quiet)",
                                    '& .MuiButtonBase': {
                                      padding: "0px",
                                      width: "var(--sizing-min-target)",
                                    },

                                },
                                '& .MuiList-root.MuiMenu-list .MuiMenuItem-root:has(.Hex)': {
                                    opacity: "1",
                                },
                                '& .MuiList-root.MuiMenu-list .MuiMenuItem-root:hover': {
                                    background: "transparent",
                                    borderLeft: "4x solid var(--background-button-half)",
                                    opacity: "1",
                                },
                                '& .MuiList-root.MuiMenu-list .MuiMenuItem-root:focus': {
                                    background: "transparent",
                                    borderLeft: "4x solid var(--background-button)",
                                    opacity: "1",
                                },
                                '& .MuiList-root.MuiMenu-list .MuiMenuItem-root.Mui-selected': {
                                    background: "transparent",
                                    borderLeft: "4x solid var(--background-button)",
                                    opacity: "1",
                                },
                                borderRadius: "var(--spacing-half)",
                            },
                        },
                    },
                },
                styleOverrides: {
                    root: {
                        borderRadius: "var(--spacing-half)",
                        minHeight: "calc(var(--sizing-1) * var(--button-height))",
                        minWidth: "calc(var(--sizing-1) * var(--button-min-width))",
                        background: "var(--input)",
                        // border: "1px solid var(--border)",
                        position: "relative",
                        "& .MuiOutlinedInput-input": {
                          color: "var(--on-background)",
                          padding: "0 var(--spacing-6) 0 var(--spacing-2) !important",

                        },
                        "& svg path": {
                          fill: "var(--on-background)",
                        },
                        minHeight: "var(--sizing-min-target)",
                        lineHeight: "var(--sizing-min-target)",
                    },
                }
            },
            MuiRadio: {
                styleOverrides: {
                    root: {
                        color: "inherit",
                        "&.Mui-checked":{
                            color: "var(--background-button)",
                        },
                        "&.Mui-checked.Mui-disabled":{
                            color: "var(--background-button)",
                        },
                    },
                    "& span":{
                        border: "var(--focusBorder) solid var(--background-button)",
                        borderRadius: "100%",
                    },
                },
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: "var(--on-background)",
                        "&.Mui-checked":{
                            color: "var(--background-button)",
                        },
                    },
                },
            },
            MuiGrid: {
                styleOverrides: {
                    root: {
                        flexWrap: "wrap",
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        height: "var(--sizing-min-target)",
                        padding: "0",
                        position: "relative",
                        overflow: "visible !important",
                        display: "flex",
                        alignItems: "center",
                    },
                    "& .MuiSwitch-switchBase": {
                        backgroundColor: "var(--background-button)",
                        color: "var(--background-button)",
                        "&.Mui-checked": {
                            backgroundColor: "var(--background-button)",
                            color: "var(--background-button)",
                        },
                    },
                },
            },
            MuiFormHelperText  : {
              styleOverrides: {
                  root: {
                    fontSize: "var(-smallFontSize)",
                    fontWeight: "var(--smallFontWeight)",
                    fontFamily: "var(--smallFontFamily)",
                    letterSpacing: "var(--smallLetterSpacing)",
                    lineHeight: "var(--smallLineHeight)",
                    padding: "var(--spacing-1) 0",
                    margin: "0",
                  }

              }
            },
            //.css-mc683d-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper
            MuiOutlinedInput: {
              styleOverrides: {
                  root: {
                      //fontFamily: "Ariel", //"var(--fontFamily)",
                      borderRadius: "var(--spacing-half)",
                      padding: "var(--spacing-0)",
                      "& .MuiInputBase-root": {
                          borderRadius: "var(--spacing-half)",
                      },
                      "& .Mui-disabled": {
                          backgroundColor: "var(--input)",
                          color: "var(--on-background)",
                          opacity: "var(--disabled)",
                          "& .Mui-disabled": {
                              backgroundColor: "var(--input)",
                              color: "var(--on-background)",
                              opacity: 1,
                          },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                          border: 'none',
                      },
                  }
              }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        //fontFamily: "Ariel", //"var(--fontFamily)",

                        borderRadius: "var(--spacing-half)",
                        padding: "var(spacing-1)",
                        "& .MuiInputBase-root": {
                            borderRadius: "var(--spacing-half)",
                        },
                        "& .MuiInputBase-root.Mui-disabled": {
                            backgroundColor: "var(--input-disabled)",
                            color: "var(--on-color)",
                        },
                        "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: '1px solid var(--background-button)',
                            boxShadow: '0 0 var(--focusBlur) 1px var(--background-button-half)',
                        },
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        fontFamily: "var(--primaryFont)",
                        fontWeight: "var(--fontWeight-4)",
                        fontSize: "calc(var(--baseFont)* .875)",
                        //fontSize: "calc(var(--baseFont))",
                        lineHeight: "var(--standard-LineHeight)",
                        letterSpacing: "1.25%",
                        textTransform: "none",
                        marginBottom: "0px",

                    }
                }
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        fontFamily: "var(--primaryFont)",
                        fontWeight: "var(--fontWeight-4)",
                        fontSize: "calc(var(--baseFont)* .875)",
                        //fontSize: "calc(var(--baseFont))",
                        lineHeight: "var(--standard-LineHeight)",
                        letterSpacing: "1.25%",
                        textTransform: "none",
                        marginBottom: "10px",
                        color: "inherit",
                        [`&.${formLabelClasses.focused}`]: {
                            color: "var(--on-background)",
                        },
                    },
                },
            },
            MuiInputAdornment: {
                styleOverrides: {
                    root: {
                        marginRight: "var(--spacing-2)",
                    }
                }
            },
            "& .MuiTab-wrapper": {
                flexDirection: "row",
                justifyContent: "flex-start",
                background: "var(--background-button)",
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        margin: "0",
                        marginBottom: "var(--spacing-1)",
                        border: "1px solid var(--border)",
                        background: "var(--white)",
                        color: "var(--on-white)",
                        position: "relative",
                        zIndex: "1",
                        borderRadius: "var(--input-radius) !important",
                        margin: "var(--spacing-half)",
                        transition: "var(--animation-speed)",
                        "& svg path": {
                            fill: "var(--on-surface)" ,
                        },
                        "& .MuiAccordionSummary-root": {
                          minHeight: "var(--sizing-min-target)",
                          padding: "0 var(--spacing-2)",
                          background: "none"

                        },
                        "& .MuiAccordionDetails-root": {
                          padding: "var(--spacing-1) var(--spacing-2) var(--spacing-2)",
                        }
                    }
                }
            },
            MuiTabs: {
                styleOverrides: {
                    root: {
                        background: "var(--transparent)",
                        padding: "var(-spacing-1) 0",
                        "& .MuiTabs-indicator": {
                            background: "var(--button) !important" ,
                            height: "4px",
                            bottom:   "2px !important",
                        },

                    }
                }
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        fontFamily: "var(--CTAFontFamily)",
                        fontWeight: "var(--CTAFontWeight)",
                        letterSpacing: "(--CTALetterSpacing)",
                        lineHeight: "(--CTALineHeight)",
                        textTransform: "(---CTATextTransform)",
                        fontSize: "--CTAFontSize", //"calc(var(--baseFont)* .875)",
                        opacity: "var(--quiet)",
                        padding: "0 var(--spacing-2)",
                        minHeight: "max(var(--sizing-min-target), calc(calc(var(--button-height) * var(--spacing-1)) + 4px))",
                        "&:hover": {
                            opacity: "1",
                            background: "var(--backround-color) !important"
                        },
                        "&:focus": {
                            opacity: "1"
                        },
                        "&.Mui-selected, &.Mui-selected:hover": {
                            opacity: "1",
                            color: "var(--on-color) !important"
                        },
                        "&::after": {
                          height: "var(--spacing-half)",
                          left: "0",
                          right: "0",
                          bottom: "0px",
                          opacity: "1",
                          content: "''",
                          position: "absolute",
                          border: "none",
                          top: "unset",
                          borderBottom: "4px solid transparent",
                          borderRadius: "0px",
                        },
                        "&:hover:not(:active)::after": {
                          height: "var(--spacing-half)",
                          left: "0",
                          right: "0",
                          bottom: "2px",
                          opacity: ".5",
                          content: "''",
                          position: "absolute",
                          border: "none",
                          top: "unset",
                          borderBottom: "4px solid var(--background-button-half)",
                          borderRadius: "0px",
                        },
                        "&:focus::after": {
                          height: "var(--spacing-half)",
                          left: "0",
                          right: "0",
                          bottom: "2px",
                          opacity: "1",
                          content: "''",
                          position: "absolute",
                          border: "none",
                          top: "unset",
                          borderBottom: "4px solid var(--background-button)",
                          borderRadius: "0px",

                        },
                        "&.Mui-selected, &.Mui-selected:focus": {
                            opacity: "1"
                        },
                    }
                }
            },
            MuiFormControl: {
                styleOverrides: {
                    root: {
                      margin: "var(--spacing-3) 0 0 important" ,
                    },
                },
            },
            MuiFormControlLabel: {
                styleOverrides: {
                    root: {
                      background: "transparent !important",
                      color: "var(--on-background)",
                      "& .MuiTypography-root": {
                        color: "inherit",
                      },

                    }
                }
            },
            MuiPagination: {
                styleOverrides: {
                    root: {
                      "& .MuiPagination-ul": {
                        gap: "var(--spacing-half)",
                      }
                    }
                }
            },
            MuiPaginationItem: {
                styleOverrides: {
                    root: {
                      padding: "0",
                      minWidth: "var(--sizing-min-target)",
                      minHeight: "max(var(--sizing-min-target), calc(var(--button-height) * var(--spacing-1))) !important",
                      borderRadius: "calc( var(--radius-1) * var(--button-radius))",
                      background: "var(--transparent) !important",
                      color: "var(--background-button) !important",
                      border: "calc(var(--border-1) * var(--background-button-border)) solid var(--background-button)",
                      "&.Mui-selected": {
                        background: "var(--background-button) !important",
                        color: "var(--background-on-button) !important",
                      },
                      "& span": {
                        padding: "0 var(--spacing-half)",
                      },
                      "& .MuiPagination-ul": {
                        gap: "var(--spacing-half)",
                      },
                      "&.MuiPaginationItem-ellipsis": {
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        paddingBottom: "20%",
                      }
                    }
                }
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        "& .MuiListSubheader": {
                          fontWeight: "500",
                        },
                        "& .MuiListItemButton": {
                            styleOverrides: {
                              root: {
                                borderLeft: "4px solid transparent !important" ,
                                minHeight: "var(--sizing-min-target) !important" ,
                              },
                              "&:hover": {
                                styleOverrides: {
                                    root: {
                                      borderLeft: "4px solid var(--background-button-half) !important",
                                    }
                                }
                              },
                              "&:active, &:focus": {
                                styleOverrides: {
                                    root: {
                                      borderLeft: "4px solid var(--background-button)  !important",
                                    }
                                }
                              }
                            }
                        }

                    }
                }
            },
            MuiListSubheader: {
                styleOverrides: {
                    root: {
                        background: "var(--alt-background) !important",
                        color: "var(--on-background)",
                        fontWeight: "font-weight: 500",
                        "& .MuiListItemText-root": {
                          "& .MuiTypography-root": {
                            textTransform: "none",
                          },
                        },
                    }
                }
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        background: "var(--background)",
                        color: "var(--on-background)",
                        border: "1px solid var(--border)",
                        padding: "var(--spacing-1) calc(var(--toast-padding) * var(--spacing-1)) !important",
                        paddingLeft: "calc(calc(var(--toast-padding) * var(--spacing-1)) + var(--spacing-1) + var(--spacing-half)) !important",
                        borderRadius: "calc(var(--toast-radius) * var(--radius-1))",
                        boxShadow: "var(--toast-shadow)",
                        position: "relative",
                        borderRadius: "calc(var(--toast-radius) * var(--radius-1))",
                        alignItems: "center",
                        position: "relative",
                        paddingRight: "calc(calc(var(--toast-padding) * var(--spacing-1)) + var(--spacing-1)) !important",
                        "& .MuiAlert-icon":{
                            marginRight: "calc(var(--toast-padding) * var(--spacing-1))",
                            alignSelf: "center",
                            padding: "0",

                        },
                        "& .MuiAlert-message": {
                          overflow: "visible !important",
                        },
                        "&::after": {
                            position: "absolute",
                            top:   "var(--spacing-1)",
                            left: "var(--spacing-1)",
                            width: "var(--spacing-half)",
                            bottom: "var(--spacing-1)",
                            borderRadius: "calc(var(--toast-radius) * var(--radius-1))",
                            content: '""',
                            background: "var(--danger)",
                        },
                        "&.MuiAlert-standardError .overline": {
                          color: "var(--danger)",
                        },
                        "&.MuiAlert-standardError::after": {
                            background: "var(--danger)",
                        },
                        "&.MuiAlert-standardError .MuiAlert-icon": {
                            color: "var(--danger)",
                        },
                        "&.MuiAlert-standardWarning::after": {
                            background: "var(--warning)",
                            "& .MuiAlert-icon ": {
                                color: "var(--warning) !important",
                            },
                        },
                        "&.MuiAlert-standardWarning .overline": {
                          color: "var(--warning)",
                        },
                        "&.MuiAlert-standardWarning .MuiAlert-icon": {
                          color: "var(--warning) !important",
                        },

                        "&.MuiAlert-standardSuccess .overline": {
                          color: "var(--success)",
                        },
                        "&.MuiAlert-standardSuccess::after": {
                            background: "var(--success)",
                        },
                        "&.MuiAlert-standardInfo .overline": {
                          color: "var(--info)",
                        },
                        "&.MuiAlert-standardInfo::after": {
                            background: "var(--info)",
                        },
                      },
                }
            },
            MuiListItemButton: {
              styleOverrides: {
                  root: {
                    "& .MuiListItemText-primary": {
                       textDecoration: "none",
                       textTransform: "none",
                    },
                },
              },
            },
            MuiSlider: {
              styleOverrides: {
                  root: {
                    height: "var(--sizing-min-target)",
                    "& .MuiSlider-rail": {
                       height: "calc(var(--sliderbarHeight) * var(--spacing-1))",
                       borderRadius: "calc(var(--slider-handle-radius) * var(--radius-1))",
                       boxShadow: "var(--sliderbar-shadow)",
                       marginTop: "  margin-top: calc( calc(var(--sizing-min-target) - calc( var(--sliderbarHeight) * var(--spacing-1) ))/2)",
                       background: "var(--on-background)",
                       opacity: "var(--disabled)",
                    },
                    "& .MuiSlider-track": {
                       backgroundColor: "var(--background-button)",
                       height: "calc(var(--sliderbarHeight) * var(--spacing-1))",
                       marginTop: "  margin-top: calc( calc(var(--sizing-min-target) - calc( var(--sliderbarHeight) * var(--spacing-1) ))/2)",
                    },
                    "& .MuiSlider-thumb": {
                        height: "calc(var(--sliderhandleHeight) * var(--spacing-1))",
                        width: "calc(var(--sliderhandleHeight) * var(--spacing-1) )",
                        borderRadius: "calc(var(--slider-handle-radius) * var(--radius-1))",
                       backgroundColor: "var(--background-button)",
                       position: "absolute",
                       top: "50%",
                       transform: "translate(0, -50%)",
                       "&::after": {
                         position: "absolute",
                         height: "var(--sizing-min-target)",
                         width: "var(--sizing-min-target)",
                         right: "calc(0px - calc(var(--focusBorder) + 2px + var(--animation-focus-distance)))",
                         bottom: "calc(0px - calc(var(--focusBorder) + 2px + var(--animation-focus-distance)))",
                         content: "''",
                         background: '#000000',
                         pointerEvents: "none",
                         borderRadius: "calc(calc(var(--slider-handle-radius) * var(--radius-1))  + 2px)",
                         border: "var(--focusBorder) solid var(--background-button)",
                         background: "transparent !important",
                         opacity: "0",
                         transition: "var(--animation-speed) cubic-bezier(0.68, -0.55, 0.265, 1.55) all",
                         zIndex: "-1",
                       },
                       "&:hover::after": {
                         position: "absolute",
                         height: "calc(var(--spacing-3) + 3px)",
                         width: "calc(var(--spacing-3) + 3px)",
                         right: "calc(0px - calc(var(--focusBorder) + 2px))",
                         bottom: "calc(0px - calc(var(--focusBorder) + 2px))",
                         opacity: ".5",
                       },
                       "&:focus::after": {
                         position: "absolute",
                         height: "calc(var(--spacing-3) + 3px)",
                         width: "calc(var(--spacing-3) + 3px)",
                         right: "calc(0px - calc(var(--focusBorder) + 2px))",
                         bottom: "calc(0px - calc(var(--focusBorder) + 2px))",
                         opacity: "1",
                       },
                    },
                },
              },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        background: "transparent !important",
                        padding: "0 calc(var(--spacing-1) * var(--chip-padding))",
                        zIndex: 1,
                        position: "relative",
                        display: "flex",
                        color: "var(--on-background)",
                        gap: "var(--spacing-1)",
                        alignItems: "center",
                        font: "var(--chipTypography)",
                        letterSpacing: "var(--chipLetterSpacing)",
                        textDecoration: "var(--chipTextDecoration)",
                        textTransform: "var(--chipTextTransform)",
                        minWidth: "max(var(--sizing-min-target), var(--chip-minwidth)) !important",
                        minHeight: "max(var(--sizing-min-target), calc(var(--chip-height) * var(--spacing-1))) !important",

                        "&::after": {
                            position: "absolute",
                            top:    "calc(((var(--sizing-min-target) - (var(--spacing-1) * var(--chip-height)))/2) - (var(--border-1) * 2) - 3px - var(--animation-focus-distance) - 2px)",
                            bottom: "calc(((var(--sizing-min-target) - (var(--spacing-1) * var(--chip-height)))/2) - (var(--border-1) * 2) - 1px - var(--animation-focus-distance) - 2px)",
                            padding: "0 calc(var(--spacing-1) * var(--chip-padding))",
                            left: "calc(-2px - calc(var(--border-1) * 2) - var(--animation-focus-distance))",
                            right: "calc(-2px - calc(var(--border-1) * 2) - var(--animation-focus-distance))",
                            borderRadius: "calc(var(--button-radius) * var(--radius-1) + 2px)",
                            border: "calc(var(--border-1) * var(--background-button-border)) solid var(--background-button)",
                            background: "transparent !important",
                            opacity: 0,
                            content: '""',
                            transition: "var(--animation-speed) cubic-bezier(0.68, -0.55, 0.265, 1.55) all"
                        },
                        "&::before": {
                            position: "absolute",
                            top:    "calc((var(--sizing-min-target) - (var(--spacing-1) * var(--chip-height)))/2)",
                            bottom: "calc((var(--sizing-min-target) - (var(--spacing-1) * var(--chip-height)))/2)",
                            padding: "0 calc(var(--spacing-1) * var(--chip-padding))",
                            left: "0px",
                            right: "0px",
                            content: '""',
                            background: "var(--transparent)",
                            boxShadow: "var(--chip-shadow)",
                            color: "var(--background-on-button)",
                            borderRadius: "calc(var(--button-radius) * var(--radius-1) + 2px)",
                            zIndex: -1,
                            border: "calc(var(--border-1) * var(--background-button-border)) solid var(--background-button)",
                            boxShadow: "var(--chip-shadow) !important",
                            minHeight: "calc( calc( var(--chip-height) * var(--spacing-1) ) - calc( var(--border-1) * var(--background-button-border) * 2 ))",
                        },
                        "&:hover::after": {
                            opacity: ".5",
                            top:    "calc(((var(--sizing-min-target) - (var(--spacing-1) * var(--chip-height)))/2) - 3px)",
                            bottom: "calc(((var(--sizing-min-target) - (var(--spacing-1) * var(--chip-height)))/2) - 3px)",
                            left: "calc(-1px - calc(var(--border-1) * 2))",
                            right: "calc(-1px - calc(var(--border-1) * 2))",
                        },
                        "&:focus::after": {
                            opacity: "var(--background-button)",
                            top:    "calc(((var(--sizing-min-target) - (var(--spacing-1) * var(--chip-height)))/2) - 3px)",
                            bottom: "calc(((var(--sizing-min-target) - (var(--spacing-1) * var(--chip-height)))/2) - 3px)",
                            left: "calc(-2px - calc(var(--border-1) * 2))",
                            right: "calc(-2px - calc(var(--border-1) * 2))",
                        },
                        "&:active::after": {
                            opacity: 1,
                        },
                        "&:hover .closeIt, &:focus .closeIt, &:active .closeIt": {
                            opacity: 1,
                        },
                        "& .MuiChip-label": {
                            paddingLeft: "var(--spacing-half)",
                            paddingLeft: "var(--spacing-half)",
                        },
                        "&.inline-icon path": {
                            fill: "var(--on-chip)",
                        },
                        "& .MuiAvatar-root": {
                            border: "solid calc(var(--border-1) * var(--avatar-border)) var(--on-chip) !important",
                            magin: "0px !important",
                        },
                    },
                },
            },
            MuiInputAdornment: {
              styleOverrides: {
                  root: {
                    "& p": {
                        padding: "0px var(--spacing-1) !important",
                    },
                  },
              },
            },
            MuiTableCell: {
              styleOverrides: {
                  root: {
                    color: "inherit !important",
                  },
              },
            },
            MuiAppBar: {
              styleOverrides: {
                  root: {
                    color: "var(--on-background)",
                    background: "var(--background)"
                  },
              },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: {
                      backgroundColor: "var(--transparent)",
                      boxShadow: "var(--avatar-shadow)",
                      border: "solid calc(var(--border-1) * var(--avatar-border-lg)) var(--background-button) !important",
                      "&.xxs": {
                        border: "solid calc(var(--border-1) * var(--avatar-border)) var(--background-button) !important",
                      },
                      "&.xs": {
                        border: "solid calc(var(--border-1) * var(--avatar-border)) var(--background-button) !important",
                      },
                      "&.sm": {
                        border: "solid calc(var(--border-1) * var(--avatar-border)) var(--background-button) !important",
                      },
                      "&.md": {
                        border: "solid calc(var(--border-1) * var(--avatar-border)) var(--background-button) !important",
                      },
                      "& svg path": {
                          fill: "var(--background-on-button)",
                      },
                      "&.black" : {
                        background: "var(--black)",
                        border: "solid calc(var(--border-1) * var(--avatar-border-lg)) var(--black) !important",
                        "& svg path": {
                            fill: "var(--white)",
                        },
                        "&.xxs": {
                          border: "solid calc(var(--border-1) * var(--avatar-border)) var(--black) !important",
                        },
                        "&.xs": {
                          border: "solid calc(var(--border-1) * var(--avatar-border)) var(--black) !important",
                        },
                        "&.sm": {
                          border: "solid calc(var(--border-1) * var(--avatar-border)) var(--black) !important",
                        },
                        "&.md": {
                          border: "solid calc(var(--border-1) * var(--avatar-border)) var(--black) !important",
                        }
                      },
                      "&.white" : {
                        backgroundColor: "var(--white)",
                        border: "solid calc(var(--border-1) * var(--avatar-border-lg)) var(--white) !important",
                        "& svg path": {
                            fill: "var(--black)",
                        },
                        "&.xxs": {
                          border: "solid calc(var(--border-1) * var(--avatar-border)) var(--white) !important",
                        },
                        "&.xs": {
                          border: "solid calc(var(--border-1) * var(--avatar-border)) var(--white) !important",
                        },
                        "&.sm": {
                          border: "solid calc(var(--border-1) * var(--avatar-border)) var(--white) !important",
                        },
                        "&.md": {
                          border: "solid calc(var(--border-1) * var(--avatar-border)) var(--white) !important",
                        }
                      },
                    },
                },
            },
        },
    });

    themes["light"] = lightTheme;

} catch (e) {
    console.error("Error in Theme.jsx: ", e);
}
