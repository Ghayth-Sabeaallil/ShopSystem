// Copyright (c) 2025 Ghayth Sabeaallil
// All rights reserved.

import { arSD, enUS } from "@mui/x-data-grid/locales";

export const dataGridLocales: Record<string, typeof arSD.components.MuiDataGrid.defaultProps.localeText> = {
    ar: arSD.components.MuiDataGrid.defaultProps.localeText,
    en: enUS.components.MuiDataGrid.defaultProps.localeText,
};

export const getDataGridLocale = (language: string) => {
    return dataGridLocales[language] ?? enUS.components.MuiDataGrid.defaultProps.localeText;
};
