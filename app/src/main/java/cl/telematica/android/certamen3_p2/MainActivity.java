package cl.telematica.android.certamen3_p2;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    private EditText mEditText;
    private Button mButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mEditText = (EditText) findViewById(R.id.edittext);
        mButton = (Button) findViewById(R.id.button);

        mButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final String text = mEditText.getText().toString();
                MyAsyncTaskExecutor.getInstance().executeMyAsynctask(new Listener() {
                    @Override
                    public void onSuccess(String result) {
                        Intent intent = new Intent(MainActivity.this, ResultsActivity.class);
                        intent.putExtra(ResultsActivity.RESULT, result);
                        startActivity(intent);
                    }
                }, text);
            }
        });
    }

    public interface Listener {
        void onSuccess(String result);
    }
}
