// File: SustainabilityUtils.java

package com.intel.sustainability;

import java.util.regex.Pattern;

public class SustainabilityUtils {

    // Validates an email address for newsletter subscription
    public static boolean isValidEmail(String email) {
        if (email == null) return false;
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pat = Pattern.compile(emailRegex);
        return pat.matcher(email).matches();
    }

    // Returns a short description for a given timeline year
    public static String getTimelineDescription(int year) {
        switch (year) {
            case 1968:
                return "Intel Corporation founded by Robert Noyce and Gordon Moore.";
            case 1971:
                return "Intel debuts the 4004, the world's first commercial microprocessor.";
            case 1978:
                return "Launch of the 8086 processor, establishing the x86 architecture.";
            case 1985:
                return "Intel introduces the 386 processor with 32-bit architecture.";
            case 2006:
                return "Intel's highest annual greenhouse gas emissions for operations.";
            case 2020:
                return "Intel launches its RISE strategy and 2030 sustainability goals.";
            case 2022:
                return "Intel commits to net-zero greenhouse gas emissions by 2040.";
            case 2023:
                return "Intel achieves 99% renewable electricity usage worldwide.";
            case 2024:
                return "Intel hosts its first Sustainability Summit.";
            default:
                return "No description available for this year.";
        }
    }

    // Checks if a language code is right-to-left (RTL)
    public static boolean isRTLLanguage(String langCode) {
        if (langCode == null) return false;
        String[] rtlLangs = {"ar", "he", "fa", "ur"};
        for (String rtl : rtlLangs) {
            if (rtl.equalsIgnoreCase(langCode)) {
                return true;
            }
        }
        return false;
    }
}