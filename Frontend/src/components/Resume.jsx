import React from 'react';
import StandardTemplate from './templates/StandardTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';

const Resume = React.forwardRef(({ data }, ref) => {
    const templateType = data?.settings?.template || 'standard';

    if (templateType === 'modern') {
        return <ModernTemplate data={data} ref={ref} />;
    } else if (templateType === 'minimalist') {
        return <MinimalistTemplate data={data} ref={ref} />;
    }

    return <StandardTemplate data={data} ref={ref} />;
});

export default Resume;
